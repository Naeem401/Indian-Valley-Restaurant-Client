import { useEffect, useState } from 'react';

const useMenu = () => {
    const [menu, setMenu] = useState([]);

    useEffect(() => {
        fetch('https://indian-valley-resturand-server.vercel.app/menu')
            .then((res) => res.json())
            .then((data) => setMenu(data));
    }, []);

    return [menu];
};

export default useMenu;
