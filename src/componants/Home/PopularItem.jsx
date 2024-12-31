import { Link } from "react-router-dom";
import useMenu from "../../Hooks/useMenu";
import PopularMenuItem from "./PopularMenuItem";
import { useAuth } from "../../AuthProvider/AuthContext";

const PopularItem = () => {
    const [menu] = useMenu();
    const { language } = useAuth();
    const popularItems = menu.filter((item) => item.popular);

    return (
        <div className="flex flex-col mb-6">
            <div className="grid md:grid-cols-2 w-4/5 mx-auto gap-6 p-4">
                {popularItems.map((item) => (
                    <PopularMenuItem key={item.id} item={item} />
                ))}
            </div>
            <Link to='/menu' className="mx-auto">
            <button className="p-4 border-b-2 border-white rounded-lg hover:border-b-[#D99904] font-medium text-xl text-white">
    {language === 'en' ? 'View Full Menu' : 'عرض القائمة الكاملة'}
</button>

            </Link>
        </div>
    );
};

export default PopularItem;
