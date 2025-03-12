import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const locations = [
  {
    name: "Exit-28",
    address: "Western Ring Branch Rd, Alawali, Riyadh 14925",
    phone: "011 436 3198",
    hours: "12:30 PM - 1:00 AM",
    coordinates: [24.7136, 46.6753], // Replace with actual coordinates
  },
  {
    name: "Shifa",
    address: "2655 Dirab Branch Rd, Ash Shifa, Riyadh 14713",
    phone: "056 436 8181",
    hours: "12:30 PM - 1:00 AM",
    coordinates: [24.5925, 46.6853], // Replace with actual coordinates
  },
  {
    name: "Al-Muzahmiya",
    address: "King Abdulaziz Rd, Al-Muzahmiya 19652",
    phone: "011 523 6676",
    hours: "12:30 PM - 1:00 AM",
    coordinates: [24.4700, 46.2800], // Replace with actual coordinates
  },
];

const Contact = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-10 bg-black text-white pt-32">
      {/* Left Side - Contact Information */}
      <div className="p-6">
        <h2 className="text-3xl font-bold mb-4">CONTACT US</h2>

        {locations.map((loc, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold">{loc.name}</h3>
            <p>
              {loc.address} <br />
              📞 {loc.phone} <br />
              🕒 {loc.hours}
            </p>
            <hr className="mt-4 border-gray-500" />
          </div>
        ))}

        {/* Social Media Links */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Follow Us</h2>
          <p>Join us on social media</p>
          <div className="flex space-x-6 mt-4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white text-3xl hover:text-[#3b5998] transition-colors duration-300"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white text-3xl hover:text-[#E1306C] transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Right Side - React Leaflet Map */}
      <div className="w-full h-full z-10">
        <MapContainer
          center={locations[0].coordinates}
          zoom={10}
          className="h-full w-full rounded-md"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc, index) => (
            <Marker key={index} position={loc.coordinates}>
              <Popup>
                <h3 className="font-bold">{loc.name}</h3>
                <p>{loc.address}</p>
                <p>📞 {loc.phone}</p>
                <p>🕒 {loc.hours}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Contact;
