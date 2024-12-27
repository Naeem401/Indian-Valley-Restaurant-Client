
const ItamCard = ({item}) => {
    return (
        <div>
            <img src={item.image} alt="" />
            <div className="bg-[#F3F3F3] text-center p-7">
                <h2 className="font-semibold text-2xl text-[#151515]">{item.itemName}</h2>
                <p className="text-[#151515]">{item.description}</p>
                <button className=" mt-2 p-3 border-b-2 border-[#D99904] rounded-lg bg-[#E8E8E8] hover:bg-[#1F2937] hover:border-b-black mx-auto font-medium text-xl text-[#BB8506]">ADD TO CART</button>
            </div>
        </div>
    );
};

export default ItamCard;