import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaSpinner } from "react-icons/fa";
import { useApp } from "../../../AppContext/AppContext";

// Translations for multi-language support
const translations = {
  en: {
    manageUsers: "Manage All Users",
    totalUsers: "Total Users",
    name: "Name",
    email: "Email",
    role: "Role",
    action: "Action",
    delete: "Delete",
    deleteConfirmationTitle: "Are you sure?",
    deleteConfirmationText: "You won't be able to revert this!",
    deleteConfirmationConfirm: "Yes, delete it!",
    deleteSuccessTitle: "Deleted!",
    deleteSuccessText: "User has been deleted.",
    deleteErrorTitle: "Error!",
    deleteErrorText: "An error occurred while deleting the user.",
  },
  ar: {
    manageUsers: "إدارة جميع المستخدمين",
    totalUsers: "إجمالي المستخدمين",
    name: "الاسم",
    email: "البريد الإلكتروني",
    role: "الدور",
    action: "الإجراء",
    delete: "حذف",
    deleteConfirmationTitle: "هل أنت متأكد؟",
    deleteConfirmationText: "لن تتمكن من التراجع عن هذا!",
    deleteConfirmationConfirm: "نعم، احذفه!",
    deleteSuccessTitle: "تم الحذف!",
    deleteSuccessText: "تم حذف المستخدم بنجاح.",
    deleteErrorTitle: "خطأ!",
    deleteErrorText: "حدث خطأ أثناء حذف المستخدم.",
  },
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { language, loading } = useApp();

  // Get translations for the current language
  const t = translations[language];

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user deletion
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: t.deleteConfirmationTitle,
      text: t.deleteConfirmationText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t.deleteConfirmationConfirm,
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/users/${id}`
        );
        if (response.status === 200) {
          // Remove the deleted user from the state
          setUsers(users.filter((user) => user._id !== id));

          // Show success message
          Swal.fire({
            title: t.deleteSuccessTitle,
            text: t.deleteSuccessText,
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          title: t.deleteErrorTitle,
          text: t.deleteErrorText,
          icon: "error",
        });
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a]">
        <FaSpinner className="animate-spin text-4xl text-[#D99904]" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#1a1a1a] min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white">{t.manageUsers}</h1>
      <p className="mb-6 text-white">
        {t.totalUsers}: {users.length}
      </p>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-[#313131] hover:bg-[#3a3a3a] transition-colors">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.name}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.email}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.role}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                {t.action}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">
                    {user.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    {t.delete}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;