import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CustomerCart from "../../Pages/Dashboard/Customer/CustomerCart";

const stripePromise = loadStripe("pk_test_51PKpZqDn4CozXdgX8WIa7bd0ccnVKaPILxl85QrjxUSRt4rIiBTbtvepM5hl3mf4qOBVjvnlx4YRox7pscSrHna500P1BVKuo2");

const CustomerCartWithStripe = () => {
  return (
    <Elements stripe={stripePromise}>
      <CustomerCart />
    </Elements>
  );
};

export default CustomerCartWithStripe;