import { createContext, useContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config"; // Import your Firebase config
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios"; // Ensure axios is installed for making HTTP requests

// Create Context
const AuthContext = createContext();
const auth = getAuth(app);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  // Language State
  const [language, setLanguage] = useState("en"); // Default language is English

  // Toggle language between English and Arabic
  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "en" ? "ar" : "en"));
  };

  // Authentication States
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User
  const createUser = async (email, password, name, phone) => {
    setLoading(true);
    try {
      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save user data (name, email, phone) to the database
      await saveUserToDatabase(userCredential.user, name, phone);

      return userCredential;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Save user data to the database
  const saveUserToDatabase = async (firebaseUser, name, phone) => {
    try {
      const userData = {
        email: firebaseUser.email,
        name: name,
        phone: phone,
        role: "customer", // Default role is student
        status: "Verified", // Set status to Verified initially
      };

      // Send the user data to the backend API to save it in your database
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error saving user to the database:", error.message);
      throw error;
    }
  };

  // Sign In User
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Log Out User
  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update User Profile without photoURL
  const updateUserProfile = async (name) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (error) {
      console.error("Error updating profile:", error.message);
      throw error;
    }
  };

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  // Context Value
  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    updateUserProfile,
    language,
    toggleLanguage,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

// Custom Hook to Use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
