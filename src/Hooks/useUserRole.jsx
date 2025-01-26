import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthProvider/AuthContext";

const useUserRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null); // Default role is null
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          setIsLoading(true);
          // Fetch user data based on email
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/${user.email}`
          );
          setRole(data.role); // Set the role from the response data
        } catch (error) {
          console.error("Error fetching user role:", error);
          setRole(null); // Reset role in case of error
        } finally {
          setIsLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchUserRole();
  }, [user]);

  return { role, isLoading };
};

export default useUserRole;
