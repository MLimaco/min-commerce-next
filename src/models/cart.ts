import { type Product } from "@/models/product";

export type CartItem = Product & {
    quantity: number;
}
