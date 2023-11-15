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
  toppings?: topping[];
  has_ice: boolean;
  has_toppings: boolean;
  has_sugar: boolean;
}

export interface topping {
  inventory_id: number;
  name: string;
  details: string;
  quantity: number;
  last_updated: string;
  is_topping: boolean;
}

export interface listProductToppings {
  toppings: topping[];
  products: product[];
  price?: number;
}

export interface ProductCardProps {
  product: product;
}
export interface ProductGridProps {
  products: product[];
}

export interface Cart {
  items: {
    product: product;
    toppings?: any | topping[];
    ice_level?: any;
    sugar_level?: any;
    notes?: string;
  }[];
  total: number;
}

export interface CartTableProps {
  columns: string[];
  items: Cart;
}

export interface ImageGalleryProps {
  images: string[];
  style?: React.CSSProperties;
}

export interface ToppingsGridProps {
  toppings: topping[];
  setToppings: React.Dispatch<React.SetStateAction<topping[]>>;
  sourceToppings: topping[];
}

export interface CartCardProps {
  item: {
    product: product;
    toppings?: any | topping[];
    ice_level?: any;
    sugar_level?: any;
    notes?: string;
  };
}

export interface CartItemProp {
  product: product;
  toppings?: any | topping[];
  ice_level?: any;
  sugar_level?: any;
  notes?: string;
}

export interface CartGridProps {
  products: product[];
}

export interface InfoBarProps {
  header: string;
  information: string;
  imageUrl: string;
}

export interface Order {
  first_name: string;
  items: OrderItem[];
  last_name: string;
  order_date: string;
  order_id: number;
  total: number;
}

export interface OrderItem {
  note?: string;
  price: number;
  product: string;
  toppings: string[];
  sugar_level: string;
  ice_level: string;
}
export interface PendingOrders {
  orders: Order[];
}

export interface PendingOrderGridProp {
  orders: Order[];
  onCardClick: (items: OrderItem[]) => void;
}

export interface PendingOrderCardProp {
  order: Order;
  onCardClick: (items: OrderItem[]) => void;
}