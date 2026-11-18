import type { User, Product, Order, AnalyticsMetric, HeavyRecord, PaginatedResult, CreateProductInput, UpdateProductInput } from '@/shared/types/domain';
import usersData from '@/assets/mock_data/users.json';
import productsData from '@/assets/mock_data/products.json';
import ordersData from '@/assets/mock_data/orders.json';
import analyticsData from '@/assets/mock_data/analytics_metrics.json';
import heavyData from '@/assets/mock_data/heavy_dataset.json';

// In-memory mutable store (persists for session)
let productsStore: Product[] = [...(productsData as Product[])];
let usersStore: User[] = [...(usersData as User[])];
let ordersStore: Order[] = [...(ordersData as Order[])];

const delay = (ms: number = 250): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms + Math.random() * 100));

// ─── Users ──────────────────────────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  await delay();
  return [...usersStore];
}

export async function getUserById(id: string): Promise<User | undefined> {
  await delay(150);
  return usersStore.find((u) => u.id === id);
}

// ─── Products ───────────────────────────────────────────────────────────────

export interface GetProductsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export async function getProducts(params: GetProductsParams = {}): Promise<PaginatedResult<Product>> {
  await delay();
  const { category, search, page = 1, limit = 10 } = params;

  let filtered = [...productsStore];
  if (category) filtered = filtered.filter((p) => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, total, page, limit, totalPages };
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  await delay(300);
  const newProduct: Product = {
    ...input,
    id: `p${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  productsStore = [newProduct, ...productsStore];
  return newProduct;
}

export async function updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
  await delay(300);
  const index = productsStore.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Product ${id} not found`);
  const updated = { ...productsStore[index], ...input } as Product;
  productsStore = productsStore.map((p) => (p.id === id ? updated : p));
  return updated;
}

export async function deleteProduct(id: string): Promise<void> {
  await delay(200);
  if (!productsStore.find((p) => p.id === id)) throw new Error(`Product ${id} not found`);
  productsStore = productsStore.filter((p) => p.id !== id);
}

// ─── Orders ─────────────────────────────────────────────────────────────────

export interface GetOrdersParams {
  status?: string;
  page?: number;
  limit?: number;
}

export async function getOrders(params: GetOrdersParams = {}): Promise<PaginatedResult<Order>> {
  await delay();
  const { status, page = 1, limit = 10 } = params;

  let filtered = [...ordersStore];
  if (status) filtered = filtered.filter((o) => o.status === status);

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, total, page, limit, totalPages };
}

// ─── Analytics ──────────────────────────────────────────────────────────────

export async function getAnalyticsMetrics(): Promise<AnalyticsMetric[]> {
  await delay(200);
  return analyticsData as AnalyticsMetric[];
}

// ─── Heavy Dataset ──────────────────────────────────────────────────────────

export async function getHeavyDataset(limit?: number): Promise<HeavyRecord[]> {
  await delay(350);
  const data = heavyData as HeavyRecord[];
  return limit ? data.slice(0, limit) : data;
}
