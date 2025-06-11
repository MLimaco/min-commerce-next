import { type Product } from "@/services/productService";

export type CartItem = Product & {
    quantity: number;
}
