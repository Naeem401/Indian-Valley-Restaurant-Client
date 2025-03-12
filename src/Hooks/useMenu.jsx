import { useEffect, useState } from "react";
import { useApp } from "../AppContext/AppContext";

const useMenu = () => {
  const [menu, setMenu] = useState([]);
  const { setLoading } = useApp();

  useEffect(() => {
    // Start loading
    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/menu`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data);
        // Stop loading after fetching data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching menu:", error);
        // Stop loading even if there was an error
        setLoading(false);
      });
  }, [setLoading]);

  return [menu];
};

export default useMenu;
