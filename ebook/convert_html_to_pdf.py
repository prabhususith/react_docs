import subprocess
import time
import json
import urllib.request
import base64
import os
import sys

def generate_pdf():
    edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
    user_data = r"C:\Users\prabh\AppData\Local\Temp\edge_pdf_profile_v2"
    port = 9334
    
    # 1. Start Edge with remote debugging
    cmd = [
        edge_path,
        "--headless=new",
        f"--remote-debugging-port={port}",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={user_data}"
    ]
    
    print("[1/5] Launching Edge headless instance...")
    proc = subprocess.Popen(cmd)
    time.sleep(2.5)
    
    try:
        import asyncio
        import websockets
        
        # 2. Get target webSocketDebuggerUrl
        print("[2/5] Connecting to Chrome DevTools Protocol (CDP)...")
        target_url = f"http://127.0.0.1:{port}/json/new?file:///P:/prabhu/projects/git_react/react_docs/ebook/FINAL_EBOOK.html"
        req = urllib.request.Request(target_url, method="PUT")
        with urllib.request.urlopen(req) as resp:
            tab_info = json.loads(resp.read().decode())
        
        ws_url = tab_info["webSocketDebuggerUrl"]
        print(f"[3/5] Debugger connected. Tab ID: {tab_info['id']}")
        
        async def run_print():
            async with websockets.connect(ws_url, max_size=150*1024*1024, ping_interval=None) as ws:
                # Enable Page domain
                await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
                
                print("[4/5] Waiting for document to render completely...")
                await asyncio.sleep(6)
                
                print("[5/5] Executing Page.printToPDF (A4 Oxford Publication Format)...")
                print_params = {
                    "id": 2,
                    "method": "Page.printToPDF",
                    "params": {
                        "landscape": False,
                        "displayHeaderFooter": False,
                        "printBackground": True,
                        "scale": 1.0,
                        "paperWidth": 8.27,    # A4 width in inches
                        "paperHeight": 11.69,  # A4 height in inches
                        "marginTop": 0.0,
                        "marginBottom": 0.0,
                        "marginLeft": 0.0,
                        "marginRight": 0.0,
                        "preferCSSPageSize": True,
                        "generateTaggedPDF": True
                    }
                }
                await ws.send(json.dumps(print_params))
                
                # Receive messages until command id 2 response arrives
                while True:
                    raw_response = await ws.recv()
                    msg = json.loads(raw_response)
                    if msg.get("id") == 2:
                        if "result" in msg and "data" in msg["result"]:
                            pdf_bytes = base64.b64decode(msg["result"]["data"])
                            out_path = r"P:\prabhu\projects\git_react\react_docs\ebook\React_19_Angular_Oxford_Rosetta_Stone.pdf"
                            with open(out_path, "wb") as f:
                                f.write(pdf_bytes)
                            print(f"\n==========================================")
                            print(f"SUCCESS: Generated PDF saved to {out_path}")
                            print(f"File size: {len(pdf_bytes):,} bytes ({len(pdf_bytes)/(1024*1024):.2f} MB)")
                            print(f"==========================================")
                        else:
                            print("Error in printToPDF response:", msg)
                        break
        
        asyncio.run(run_print())
        
    finally:
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except subprocess.TimeoutExpired:
            proc.kill()

if __name__ == "__main__":
    generate_pdf()
