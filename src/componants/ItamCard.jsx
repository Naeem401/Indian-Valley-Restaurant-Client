import { useAuth } from "../AuthProvider/AuthContext";

const ItameCard = ({ item }) => {
    const { language } = useAuth();

    return (
        <div className="bg-[#1a1a1a] rounded-lg shadow-lg mb-4 overflow-hidden">
            <img
                className="w-full h-[200px] object-cover"
                src={item.image}
                alt={item.name[language]} // Dynamically set alt text based on language
            />
            <div className="text-center p-6">
                <h2 className="font-semibold text-xl text-[#f8f8f8] mb-2">
                    <br />
                    <span className="italic text-[#adacac]">
                        {item.name[language]} {/* Dynamic name based on language */}
                    </span>
                </h2>
                <p className="text-sm text-[#BB8506] font-semibold mb-1">
                    {language === 'en' ? `${item.calories} Calories` : `${item.calories} سعرات حرارية`} {/* Dynamic text for calories */}
                </p>
                <p className="text-2xl font-semibold text-[#BB8506] mt-2">
                    SR {item.price}
                </p>
                <button className=" mt-2 p-3 border-b-2 border-[#D99904] rounded-lg bg-[#E8E8E8] hover:bg-[#1F2937] hover:border-b-black mx-auto font-medium text-xl text-[#BB8506]">
                    {language === 'en' ? 'ADD TO CART' : 'أضف إلى السلة'} {/* Dynamic button text */}
                </button>
            </div>
        </div>
    );
};

export default ItameCard;
