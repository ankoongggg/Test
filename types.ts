export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  // Optional longer description for product detail modal
  fullDescription?: string;
  image: string;
  category: 'tea' | 'milk-tea' | 'herbal';
  // Optional size pricing. M is the base size, L is larger (+10000 by convention).
  sizes?: {
    M: number;
    L: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  // Selected size for this cart item. If omitted, M is assumed.
  size?: 'M' | 'L';
}

export enum ViewState {
  HOME = 'HOME',
  CART = 'CART',
  CHECKOUT = 'CHECKOUT',
  ORDERS = 'ORDERS'
}