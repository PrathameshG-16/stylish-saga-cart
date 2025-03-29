
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types/Product";
import { toast } from "sonner";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);
        
        if (existingItem) {
          set({
            items: currentItems.map((item) => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
        
        toast.success("Added to cart");
      },
      updateQuantity: (id: string, quantity: number) => {
        if (quantity < 1) return;
        
        set({
          items: get().items.map((item) => 
            item.id === id ? { ...item, quantity } : item
          )
        });
      },
      removeItem: (id: string) => {
        set({
          items: get().items.filter((item) => item.id !== id)
        });
        
        toast.success("Item removed from cart");
      },
      clearCart: () => {
        set({ items: [] });
      },
      cartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      }
    }),
    {
      name: "cart-storage"
    }
  )
);
