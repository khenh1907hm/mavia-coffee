'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
  image_url: string;
  slug: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, weight: string) => void;
  updateQuantity: (id: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const isInitialMount = useRef(true);
  const isSyncingFromDB = useRef(false);

  // 1. Auth State Listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);

      // CLEAR CART ON LOGOUT
      if (event === 'SIGNED_OUT') {
        setCart([]);
        localStorage.removeItem('mavia_cart');
      }

      // If a user just signed in, we will handle the DB sync in the other useEffect
    });

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Load and Merge Cart on Login
  useEffect(() => {
    if (!user) return;

    const syncCartOnLogin = async () => {
      isSyncingFromDB.current = true;
      try {
        const { data, error } = await supabase
          .from('user_carts')
          .select('cart_data')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching cart from DB:', error);
          return;
        }

        const dbCart: CartItem[] = data?.cart_data || [];
        
        // Merge strategy: Sum quantities for same items
        setCart(prevLocalCart => {
          const mergedCart = [...dbCart];
          
          prevLocalCart.forEach(localItem => {
            const existingInDbIdx = mergedCart.findIndex(
              dbItem => dbItem.id === localItem.id && dbItem.weight === localItem.weight
            );
            
            if (existingInDbIdx > -1) {
              mergedCart[existingInDbIdx].quantity += localItem.quantity;
            } else {
              mergedCart.push(localItem);
            }
          });
          
          return mergedCart;
        });
      } finally {
        isSyncingFromDB.current = false;
      }
    };

    syncCartOnLogin();
  }, [user]);

  // 3. Persistent Local Storage (Fallback)
  useEffect(() => {
    if (isInitialMount.current) {
      const savedCart = localStorage.getItem('mavia_cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart', e);
        }
      }
      isInitialMount.current = false;
      return;
    }

    localStorage.setItem('mavia_cart', JSON.stringify(cart));
  }, [cart]);

  // 4. Sync to Database on Cart Change
  useEffect(() => {
    if (!user || isSyncingFromDB.current || isInitialMount.current) return;

    const syncToDb = async () => {
      await supabase
        .from('user_carts')
        .upsert({ 
          user_id: user.id, 
          cart_data: cart,
          updated_at: new Date().toISOString()
        });
    };

    const timeout = setTimeout(syncToDb, 1000); // Debounce sync
    return () => clearTimeout(timeout);
  }, [cart, user]);

  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.id === newItem.id && item.weight === newItem.weight
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        return updatedCart;
      }

      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (id: string, weight: string) => {
    setCart(prevCart => prevCart.filter(item => !(item.id === id && item.weight === weight)));
  };

  const updateQuantity = (id: string, weight: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id && item.weight === weight ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('mavia_cart');
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
