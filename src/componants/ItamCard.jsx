const ItameCard = ({ item }) => {
    return (
        <div className="bg-[#1a1a1a] rounded-lg shadow-lg mb-4 overflow-hidden">
            <img 
                className="w-full h-[200px] object-cover" 
                src={item.image}
            />
            <div className="text-center p-6">
                <h2 className="font-semibold text-xl text-[#f8f8f8] mb-2">
                    <br />
                    <span className="italic text-[#adacac]">
                        {item.name.en} 
                    </span>
                </h2>
                <p className="text-sm text-[#BB8506] font-semibold mb-1">
                    {item.calories} سعرات حرارية
                </p>
                <p className="text-2xl font-semibold text-[#BB8506] mt-2">SR {item.price}</p>
                <button className=" mt-2 p-3 border-b-2 border-[#D99904] rounded-lg bg-[#E8E8E8] hover:bg-[#1F2937] hover:border-b-black mx-auto font-medium text-xl text-[#BB8506]">ADD TO CART</button>
            </div>
            
        </div>
    );
};

export default ItameCard;