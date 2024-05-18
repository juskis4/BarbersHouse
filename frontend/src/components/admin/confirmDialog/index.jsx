import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

function ConfirmationDialog({ open, onClose, onConfirm, title, contentText }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="outlined"
          color="error"
          sx={{
            backgroundColor: "transparent",
            color: "redAccent.main",
            "&:hover": {
              backgroundColor: "redAccent.main",
              color: "white",
            },
          }}
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
