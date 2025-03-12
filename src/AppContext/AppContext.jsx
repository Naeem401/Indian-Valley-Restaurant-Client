
  import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { app } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const AppContext = createContext();
const auth = getAuth(app);

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({ items: [] });

  // Language toggle
  const toggleLanguage = () => setLanguage(prev => prev === "en" ? "ar" : "en");

  // User management
  const createUser = async (email, password, name, phone) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const dbUser = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        email,
        name,
        phone,
        role: "customer",
        status: "Verified"
      });
      setUser({ ...userCredential.user, ...dbUser.data });
    } catch (error) {
      console.error("User creation failed:", error);
      throw error;
    }
  };

  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
    // Update User Profile
    const updateUserProfile = async (name) => {
      try {
        await updateProfile(auth.currentUser, { displayName: name });
        // Refresh user data from backend after update
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.email}`);
        setUser((prev) => ({ ...prev, ...response.data }));
      } catch (error) {
        console.error("Error updating profile:", error.message);
        throw error;
      }
    };
  
  

  const logOut = async () => {
    try {
      await signOut(auth);
      setCart({ items: [] });
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  // Cart operations
  const fetchCart = useCallback(async () => {
    if (user?._id) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/cart/${user._id}`);
        setCart(response.data || { items: [] });
      } catch (error) {
        console.error("Cart fetch failed:", error);
      }
    }
  }, [user]);

  const addToCart = async (item) => {
    if (!user) {
      alert("Please login to add items");
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/cart`, {
        userId: user._id,
        item: {
          itemId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        }
      });
      await fetchCart();
    } catch (error) {
      console.error("Add to cart failed:", error);
      alert("Failed to add item");
    }
  };

  const updateCartItem = async (itemId, newQuantity) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL}/cart/${user._id}/item/${itemId}`, {
        newQuantity
      });
      await fetchCart();
    } catch (error) {
      console.error("Quantity update failed:", error);
      alert("Failed to update quantity");
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${user._id}/item/${itemId}`);
      await fetchCart();
    } catch (error) {
      console.error("Item removal failed:", error);
      alert("Failed to remove item");
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${user._id}`);
      setCart({ items: [] });
    } catch (error) {
      console.error("Cart clear failed:", error);
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${currentUser.email}`);
          setUser({ ...currentUser, ...response.data });
          await fetchCart();
        } catch (error) {
          console.error("User data fetch failed:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
        setCart({ items: [] });
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [fetchCart]);

  return (
    <AppContext.Provider value={{
      user,
      loading,
      setLoading,
      createUser,
      signIn,
      logOut,
      language,
      toggleLanguage,
      cart,
      addToCart,
      updateCartItem,
      removeFromCart,
      clearCart,
      fetchCart,
      updateUserProfile
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);