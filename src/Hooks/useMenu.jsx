import { useEffect, useState } from 'react';

const useMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/menu`)
            .then((res) => res.json())
            .then((data) => setMenu(data));
    }, []);

    return [menu];
};

export default useMenu;
