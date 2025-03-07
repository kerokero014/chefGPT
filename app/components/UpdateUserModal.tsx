import React from "react";
import type User from "~/Data/User.interface";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";

interface UpdateUserModalProps {
  formData: User;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function UpdateUserModal({
  formData,
  isModalOpen,
  setIsModalOpen,
  handleInputChange,
  handleSubmit,
}: UpdateUserModalProps) {
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        Update User Information
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Weight Goal (kg)"
              name="weightGoal"
              type="number"
              value={formData.weightGoal}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Dislikes"
              name="dislikes"
              value={formData.dislikes}
              onChange={handleInputChange}
              fullWidth
            />
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              onClick={() => setIsModalOpen(false)}
              sx={{ mr: 2 }}
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
