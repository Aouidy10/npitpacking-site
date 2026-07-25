"use client";

import { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import { CartItem } from "@/lib/cart";

/* ── State & Actions ── */
type State = { items: CartItem[] };
type Action =
  | { type: "ADD";        item: CartItem }
  | { type: "REMOVE";     id: string }
  | { type: "SET_QTY";    id: string; quantite: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE";    items: CartItem[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, quantite: i.quantite + action.item.quantite }
              : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY":
      if (action.quantite < 1) return { items: state.items.filter((i) => i.id !== action.id) };
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantite: action.quantite } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

/* ── Context ── */
interface CartCtx {
  items: CartItem[];
  totalItems: number;
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  setQty: (id: string, quantite: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartCtx | null>(null);

const LS_KEY = "npit_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  /* Hydratation depuis localStorage */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
    } catch { /* ignore */ }
  }, []);

  /* Persistance à chaque changement */
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const add     = useCallback((item: CartItem)              => dispatch({ type: "ADD",     item }),          []);
  const remove  = useCallback((id: string)                  => dispatch({ type: "REMOVE",  id }),            []);
  const setQty  = useCallback((id: string, q: number)       => dispatch({ type: "SET_QTY", id, quantite: q }), []);
  const clear   = useCallback(()                            => dispatch({ type: "CLEAR" }),                  []);

  const totalItems = state.items.reduce((s, i) => s + i.quantite, 0);

  return (
    <CartContext.Provider value={{ items: state.items, totalItems, add, remove, setQty, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider");
  return ctx;
}
