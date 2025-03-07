import type User from "~/Data/User.interface";
import { useUpdateUser } from "~/hooks/useUpdateUser";
import UpdateUserModal from "./UpdateUserModal";
import { Card, CardContent, Typography, Button } from "@mui/material";

export default function ProfileCard({ user }: { user: User }) {
  console.log("ProfileCard user:", user);

  const {
    formData,
    isModalOpen,
    setIsModalOpen,
    handleInputChange,
    handleSubmit,
  } = useUpdateUser(user);

  return (
    <Card
      sx={{
        maxWidth: { xs: "90%", md: "700px" },
        mx: "auto",
        boxShadow: 6,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "grey.300",
        bgcolor: "background.paper",
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ mb: 3, fontWeight: "bold" }}
        >
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          {user.email}
        </Typography>
        {user.weightGoal && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Weight Goal:</strong> {user.weightGoal} kg
          </Typography>
        )}
        {user.allergies && user.allergies.length > 0 && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Allergies:</strong> {user.allergies.join(", ")}
          </Typography>
        )}
        {user.dislikes && user.dislikes.length > 0 && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Dislikes:</strong> {user.dislikes.join(", ")}
          </Typography>
        )}
        {user.favoriteFoods && user.favoriteFoods.length > 0 && (
          <Typography variant="body1" sx={{ mb: 2 }}>
            <strong>Favorite Foods:</strong> {user.favoriteFoods.join(", ")}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 4,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 2,
            boxShadow: 3,
          }}
          onClick={() => setIsModalOpen(true)}
        >
          Update Info
        </Button>
      </CardContent>

      <UpdateUserModal
        formData={formData}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Card>
  );
}
