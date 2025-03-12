import { useState } from "react";
import { useApp } from "../../AppContext/AppContext";

const Profile = () => {
  const { user, updateUserProfile } = useApp();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserProfile({ name, phone });
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6 bg-[#1a1a1a] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 bg-[#313131] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D99904]"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 bg-[#313131] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D99904]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#D99904] text-white py-2 px-4 rounded-lg hover:bg-[#dbaa1a] transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;