import type User from "~/Data/User.interface";
import { useUpdateUser } from "~/hooks/useUpdateUser";
import UpdateUserModal from "./UpdateUserModal";

export default function ProfileCard({ user }: { user: User }) {
  const {
    formData,
    isModalOpen,
    setIsModalOpen,
    handleInputChange,
    handleSubmit,
  } = useUpdateUser(user);

  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{user.email}</p>
        {user.weightGoal && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Weight Goal: {user.weightGoal} kg
          </p>
        )}
        {user.allergies && user.allergies.length > 0 && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Allergies: {user.allergies.join(", ")}
          </p>
        )}
        {user.dislikes && user.dislikes.length > 0 && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Dislikes: {user.dislikes.join(", ")}
          </p>
        )}
        {user.favoriteFoods && user.favoriteFoods.length > 0 && (
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Favorite Foods: {user.favoriteFoods.join(", ")}
          </p>
        )}
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          Update Info
        </button>
      </div>

      <UpdateUserModal
        formData={formData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
