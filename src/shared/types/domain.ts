export type Role = 'Admin' | 'Manager' | 'Developer';
export type UserStatus = 'Active' | 'Inactive';
export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
export type ProductCategory = 'Education' | 'Hardware' | 'Furniture';
export type HeavyRecordCategory = 'Alpha' | 'Beta' | 'Gamma' | 'Delta';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  avatar: string;
  createdAt: string;
  department: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  rating: number;
  description: string;
  sku: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerId: string;
  total: number;
  status: OrderStatus;
  date: string;
  items: OrderItem[];
}

export interface AnalyticsMetric {
  month: string;
  revenue: number;
  orders: number;
  users: number;
  conversionRate: number;
  avgOrderValue: number;
}

export interface FormFieldSchema {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'textarea' | 'date' | 'number';
  required: boolean;
  placeholder?: string;
  options?: string[];
  validation: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    min?: number;
    max?: number;
  };
}

export interface HeavyRecord {
  id: string;
  name: string;
  value: number;
  category: HeavyRecordCategory;
  status: 'Active' | 'Inactive';
  score: number;
  date: string;
}

export interface PermissionsMatrix {
  [role: string]: {
    [resource: string]: string[];
  };
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateProductInput {
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  rating: number;
  description: string;
  sku: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {}
