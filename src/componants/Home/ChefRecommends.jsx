import useMenu from "../../Hooks/useMenu";
import { useEffect, useState } from "react";
import ItemCard from "../ItamCard";

const ChefRecommends = () => {
  const [menu] = useMenu();
  const [chefRecommends, setChefRecommends] = useState([]);

  useEffect(() => {
    // Filter, sort by creation date, and limit to 9 items
    const sortedItems = menu
      .filter((item) => item.chefrecommends)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 9);
    
    setChefRecommends(sortedItems);
  }, [menu]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-5 mx-auto">
      {chefRecommends.map((item) => (
        <ItemCard key={item._id} item={item} />
      ))}
    </div>
  );
};

export default ChefRecommends;