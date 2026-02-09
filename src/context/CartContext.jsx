/* ============================================================
   HEAVY HELVETICA — Cart Context
   useReducer-based cart with sonner toast notifications.
   Prevents duplicates by dropNumber. Brand-minimal toasts.
   ============================================================ */

import { createContext, useContext, useReducer, useMemo, useCallback } from "react";
import { toast } from "sonner";

const CartContext = createContext(null);

// ── Action Types ────────────────────────────────────────────
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR_CART = "CLEAR_CART";

// ── Reducer ─────────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const exists = state.some(
        (item) => item.dropNumber === action.payload.dropNumber
      );
      if (exists) return state;
      return [...state, action.payload];
    }

    case REMOVE_ITEM: {
      return state.filter((item) => item.dropNumber !== action.payload);
    }

    case CLEAR_CART: {
      return [];
    }

    default:
      return state;
  }
}

// ── Provider ────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = useCallback(
    (product) => {
      const exists = cart.some((item) => item.dropNumber === product.dropNumber);
      if (exists) {
        toast(`#${product.dropNumber} — ALREADY SELECTED`, {
          duration: 2000,
        });
        return;
      }
      dispatch({ type: ADD_ITEM, payload: product });
      toast(`#${product.dropNumber} — ARTIFACT SECURED`, {
        duration: 2000,
      });
    },
    [cart]
  );

  const removeFromCart = useCallback((dropNumber) => {
    dispatch({ type: REMOVE_ITEM, payload: dropNumber });
    toast(`#${dropNumber} — SELECTION RELEASED`, {
      duration: 2000,
    });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: CLEAR_CART });
    toast("ALL SELECTIONS CLEARED", {
      duration: 2000,
    });
  }, []);

  const cartCount = useMemo(() => cart.length, [cart]);

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartCount,
    }),
    [cart, addToCart, removeFromCart, clearCart, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ── Hook ────────────────────────────────────────────────────
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default CartContext;
