import { FaHome, FaShoppingCart, FaHistory, } from "react-icons/fa";
import MenuItem from "./MenuItem";

const CustomerMenu = () => {
  return (
    <>
      <MenuItem icon={FaHome} label="Home" address="customer-home" />
      <MenuItem icon={FaShoppingCart} label="Cart" address="customer-cart" />
      <MenuItem icon={FaHistory} label="Orders" address="customer-orders" />
    </>
  );
};

export default CustomerMenu;