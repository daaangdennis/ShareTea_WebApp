import { ReactElement } from "react";

export interface route {
  name: string;
  path: string;
  element: ReactElement;
}

export interface navbarProps {
  routes: route[];
}

export interface product {
  product_id: number;
  name: string;
  url: string;
  description?: string;
  price: number;
  category: string;
}

export interface ProductCardProps {
  product: product;
}
export interface ProductGridProps {
  // products: product[];
}

export interface Cart {
  items: {
    product: product;
    toppings?: any;
    notes?: string;
  }[];
  total: number;
}

export interface CartTableProps {
  columns: string[];
  items: Cart;
}