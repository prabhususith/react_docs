import React from 'react';
import { createSlice, configureStore, type PayloadAction } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AngularVsReactCard } from '@/shared/components/AngularVsReactCard';

interface CartItem { id: string; name: string; price: number; qty: number; }
interface CartState { items: CartItem[]; discount: number; }

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], discount: 0 } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'qty'>>) => {
      const ex = state.items.find(i => i.id === action.payload.id);
      if (ex) ex.qty += 1; else state.items.push({ ...action.payload, qty: 1 });
    },
    removeItem: (state, action: PayloadAction<string>) => { state.items = state.items.filter(i => i.id !== action.payload); },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => { const i = state.items.find(x => x.id === action.payload.id); if (i) i.qty = Math.max(1, action.payload.qty); },
    setDiscount: (state, action: PayloadAction<number>) => { state.discount = Math.min(50, Math.max(0, action.payload)); },
    clearCart: (state) => { state.items = []; state.discount = 0; },
  },
});
const { addItem, removeItem, updateQty, setDiscount, clearCart } = cartSlice.actions;
const store = configureStore({ reducer: { cart: cartSlice.reducer } });
type RootState = ReturnType<typeof store.getState>;

const CATALOG = [{ id: 'p1', name: 'React Pro Course', price: 149 }, { id: 'p2', name: 'TypeScript Guide', price: 99 }, { id: 'p3', name: 'AWS Bootcamp', price: 199 }];

function CartContent() {
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.cart.items);
  const discount = useSelector((s: RootState) => s.cart.discount);
  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0);
  const total = subtotal * (1 - discount / 100);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {CATALOG.map(p => <button key={p.id} onClick={() => dispatch(addItem(p))} className="bg-slate-900 hover:bg-slate-700 rounded-lg p-3 text-left"><p className="text-xs font-medium text-white">{p.name}</p><p className="text-xs text-indigo-400">${p.price} · + Add</p></button>)}
      </div>
      {items.length > 0 ? (
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3 bg-slate-900 rounded-lg px-3 py-2">
              <div className="flex-1"><p className="text-sm text-white">{item.name}</p><p className="text-xs text-slate-400">${item.price} × {item.qty}</p></div>
              <div className="flex items-center gap-1">
                <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))} className="w-6 h-6 rounded bg-slate-700 text-white text-xs flex items-center justify-center">−</button>
                <span className="w-6 text-center text-sm text-white">{item.qty}</span>
                <button onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))} className="w-6 h-6 rounded bg-slate-700 text-white text-xs flex items-center justify-center">+</button>
              </div>
              <span className="text-sm text-emerald-400 w-16 text-right">${(item.price * item.qty).toFixed(2)}</span>
              <button onClick={() => dispatch(removeItem(item.id))} className="text-red-400 text-xs">✕</button>
            </div>
          ))}
          <div className="flex items-center gap-2"><label className="text-xs text-slate-400">Discount:</label><input type="range" min="0" max="50" value={discount} onChange={e => dispatch(setDiscount(+e.target.value))} className="flex-1 accent-indigo-500" /><span className="text-xs text-indigo-400 w-8">{discount}%</span></div>
          <div className="bg-slate-900 rounded-lg p-3 space-y-1">
            <div className="flex justify-between text-sm text-slate-400"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-sm text-red-400"><span>Discount</span><span>-${(subtotal * discount / 100).toFixed(2)}</span></div>}
            <div className="flex justify-between text-base font-bold text-white border-t border-slate-700 pt-1"><span>Total</span><span className="text-emerald-400">${total.toFixed(2)}</span></div>
          </div>
          <button onClick={() => dispatch(clearCart())} className="btn-danger text-sm w-full">Clear Cart</button>
        </div>
      ) : <p className="text-center text-slate-500 text-sm py-4">Cart empty. Add items above.</p>}
    </div>
  );
}

export function ReduxToolkitVsNgRx() {
  return (
    <div className="chapter-container">
      <h1 className="section-header">Redux Toolkit vs NgRx Store</h1>
      <p className="section-subheader">NgRx brings Redux patterns to Angular. Redux Toolkit (RTK) is the official batteries-included Redux for React — createSlice + Immer instead of separate Actions/Reducers/Effects files.</p>

      <AngularVsReactCard
        concept="NgRx vs Redux Toolkit Slice"
        angularCode={`// NgRx: Actions, Reducers, Selectors in separate files
export const addItem = createAction('[Cart] Add Item', props<{ item: CartItem }>());
export const cartReducer = createReducer(
  initialState,
  on(addItem, (state, { item }) => ({ ...state, items: [...state.items, item] }))
);
export const selectCartItems = createSelector(selectCartState, s => s.items);

// Component
items$ = this.store.select(selectCartItems);
add(item: CartItem) { this.store.dispatch(addItem({ item })); }`}
        reactCode={`// RTK: createSlice co-locates actions + reducer
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] } as CartState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      // Immer: write "mutations" safely
      state.items.push(action.payload);
    },
  },
});
export const { addItem } = cartSlice.actions;

// Component
const items = useSelector(s => s.cart.items);
const dispatch = useDispatch();
dispatch(addItem(item));`}
        rationale="NgRx enforces strict separation: Actions, Reducers, Selectors, Effects in separate files. RTK's createSlice co-locates actions and reducers with Immer for immutable 'mutations'. Both use unidirectional data flow. RTK Query is RTK's equivalent of NgRx Effects + HTTP layer."
        defaultExpanded={true}
      />

      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-5">
        <h2 className="text-sm font-semibold text-white mb-4">🎮 Live Redux Toolkit Cart</h2>
        <Provider store={store}><CartContent /></Provider>
      </div>
    </div>
  );
}
