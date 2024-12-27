import useMenu from "../../Hooks/useMenu";
import ItamCard from "../ItamCard";

const ChefRecommends = () => {
    const [menu] = useMenu();
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[80%] gap-5 mx-auto">
            {
                menu.map((item) => (
<ItamCard key={item.itemName} item={item}/>
                ) )
            }
        </div>
    );
};

export default ChefRecommends;