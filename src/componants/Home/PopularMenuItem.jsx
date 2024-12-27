

const PopularMenuItem = ({item}) => {
    const { itemName, description, image, price } = item || {};

    return (
        <div className="md:flex space-x-4 items-center border-b border-gray-700 pb-4 mb-4">
            <img
                className="w-[80px] h-[80px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px] mb-2 md:mb-0"
                src={image}
                alt={itemName}
            />
            <div className="flex-grow">
                <h2 className="uppercase text-xl text-white">
                    {itemName} <span className="text-[#BB8506]">------------</span>
                </h2>
                <p className="text-[#9e9e9e]">{description}</p>
            </div>
            <p className="text-xl text-[#BB8506]">SR {price}</p>
        </div>
    );
};


export default PopularMenuItem;