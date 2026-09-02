"use client";

import { useEffect, useState } from "react";
import { products } from "@/data/mock-data";
import type { CartItem, ProductSize } from "@/types/cart";

const STORAGE_KEY = "map-cart";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      // Browser storage is the external source being synchronized here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved) setCart(JSON.parse(saved) as CartItem[]);
    } catch {
      // The storefront remains usable when browser storage is unavailable.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addItem = (productId: string, size: ProductSize, quantity = 1) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.productId === productId && item.size === size,
      );
      const stock = products.find((product) => product.id === productId)?.stock[size] ?? 0;

      if (existing) {
        return previous.map((item) =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: Math.min(stock, item.quantity + quantity) }
            : item,
        );
      }

      return [...previous, { productId, size, quantity: Math.min(stock, quantity) }];
    });
  };

  const updateQuantity = (item: CartItem, quantity: number) => {
    if (quantity <= 0) {
      setCart((previous) =>
        previous.filter(
          (candidate) =>
            candidate.productId !== item.productId || candidate.size !== item.size,
        ),
      );
      return;
    }

    const stock = products.find((product) => product.id === item.productId)?.stock[item.size] ?? 0;
    setCart((previous) =>
      previous.map((candidate) =>
        candidate.productId === item.productId && candidate.size === item.size
          ? { ...candidate, quantity: Math.min(stock, quantity) }
          : candidate,
      ),
    );
  };

  const removeItem = (item: CartItem) => {
    setCart((previous) =>
      previous.filter(
        (candidate) =>
          candidate.productId !== item.productId || candidate.size !== item.size,
      ),
    );
  };

  return {
    cart,
    cartCount: cart.reduce((total, item) => total + item.quantity, 0),
    addItem,
    updateQuantity,
    removeItem,
    clearCart: () => setCart([]),
  };
}
