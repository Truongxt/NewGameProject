import React, { createContext, useState, useContext, useMemo, useCallback, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = useCallback((product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((p) => p.id === product.id);
            if (existingProduct) {
                return prevCart.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prevCart, { ...product, quantity:1 }];
            }
        });
        toast.success(`Thêm ${product.title} vào giỏ hàng`);
    }, []);

    const clearCart = useCallback(() => {
        setCart([]); 
    }, []);

    const updateQuantity = useCallback((productId, quantity) => {
        setCart((prevCart) =>
            prevCart.map((p) =>
                p.id === productId ? { ...p, quantity: Math.max(1, quantity) } : p
            )
        );
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const totalItems = useMemo(() =>
        cart.reduce((total, item) => total + item.quantity, 0)
        , [cart]);

    const totalPrice = useMemo(() =>
        cart.reduce((total, item) => total + item.price * item.quantity, 0)
        , [cart]);

    const formatCurrency = (amount) => {
        if (isNaN(amount)) return "0 ₫";
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    };

    const cartContextValue = useMemo(() => ({
        cart,
        clearCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalItems,
        totalPrice,
        formatCurrency
    }), [cart, clearCart, addToCart, updateQuantity, removeFromCart, totalItems, totalPrice, formatCurrency]);

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);