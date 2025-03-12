import { useState } from "react";
import { useApp } from "../../AppContext/AppContext";
import ItemModal from "../Dashboard/Mudel/ItemModal";

const PopularMenuItem = ({ item }) => {
  const { name, description, image, price } = item || {};
  const { language } = useApp();
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false); // Close modal by setting state to false

  return (
    <div
      className="md:flex space-x-4 items-center border-b border-gray-700 pb-4 mb-4 cursor-pointer"
      onClick={openModal} // Open modal on card click
    >
      <img
        className="w-[80px] h-[80px] rounded-tr-[200px] rounded-br-[200px] rounded-bl-[200px] mb-2 md:mb-0"
        src={image}
        alt={name?.[language]}
      />
      <div className="flex-grow">
        <h2 className="uppercase text-xl text-white">
          {name?.[language]} <span className="text-[#BB8506]">------------</span>
        </h2>
        <p className="text-[#9e9e9e]">{description?.[language]}</p>
      </div>
      <p className="text-xl text-[#BB8506]">SAR {price}</p>

      {/* Modal should be rendered when showModal is true */}
      {showModal && <ItemModal item={item} closeModal={closeModal} />}
    </div>
  );
};

export default PopularMenuItem;
