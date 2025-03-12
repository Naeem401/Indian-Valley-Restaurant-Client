import { useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../AppContext/AppContext";

const useUserRole = () => {
  const { user } = useApp();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        setLoading(true); // Set loading to true before fetching
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/${user.email}`
          );
          setRole(data.role || null); // Ensure role is explicitly set
        } catch (error) {
          console.error("Error fetching user role:", error);
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      } else {
        setLoading(false); // If no user, stop loading
      }
    };

    fetchUserRole();
  }, [user?.email]); // Depend on user email

  return { role, loading };
};

export default useUserRole;
