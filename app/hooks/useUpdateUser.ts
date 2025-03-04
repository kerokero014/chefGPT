import { useState } from "react";
import type User from "~/Data/User.interface";

export function useUpdateUser(user: User) {
  const [formData, setFormData] = useState(user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user information", error);
    }
  };

  return {
    formData,
    isModalOpen,
    setIsModalOpen,
    handleInputChange,
    handleSubmit,
  };
}
