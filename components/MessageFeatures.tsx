import React from "react";
import { Message as MessageType } from "@/typings"; // your Message type
import IconButton from "@mui/material/IconButton";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { BiEditAlt } from "react-icons/bi";

type Props = {
  message: MessageType;
  chatId: string;
  isEditing: boolean;
  handleEditClick: () => void;
  handleCancelClick: () => void;
  handleSaveClick: () => void;
  handleCopyClick: () => void;
  handleDeleteClick: () => void;
  handleConfirmDelete: () => void;
  handleStarClick: () => void;
  handleLikeClick: () => void;
  handleDislikeClick: () => void;
  showCheckIcon: boolean;
  confirmDelete: boolean;
  checked: boolean;
  liked: boolean;
  disliked: boolean;
};

const MessageFeatures = (props: Props) => {
  const {
    isEditing,
    handleEditClick,
    handleCancelClick,
    handleSaveClick,
    handleCopyClick,
    handleDeleteClick,
    handleConfirmDelete,
    handleStarClick,
    handleLikeClick,
    handleDislikeClick,
    showCheckIcon,
    confirmDelete,
    checked,
    liked,
    disliked,
  } = props;

  if (isEditing || confirmDelete) {
    return (
      <div className="flex justify-end space-x-2 mr-[100px] border-2 border-black/20 rounded-md">
        <IconButton
          sx={{ color: "green" }}
          onClick={isEditing ? handleSaveClick : handleConfirmDelete}
        >
          <CheckIcon fontSize="small" />
        </IconButton>
        <IconButton
          sx={{ color: "red" }}
          onClick={isEditing ? handleCancelClick : handleDeleteClick}
        >
          <ClearIcon fontSize="small" />
        </IconButton>
      </div>
    );
  }

  return (
    <div className="flex justify-end space-x-2 mr-[100px] border-2 border-black/20 rounded-md">
      <IconButton
        sx={{
          color: "gray",
          "&:hover": {
            color: "black",
          },
        }}
        onClick={handleEditClick}
      >
        <BiEditAlt size={20} />
      </IconButton>
      <IconButton
        sx={{
          color: "gray",
          "&:hover": {
            color: "black",
          },
        }}
        onClick={handleCopyClick}
      >
        {showCheckIcon ? (
          <CheckIcon fontSize="small" />
        ) : (
          <ContentPasteIcon fontSize="small" />
        )}
      </IconButton>
      <IconButton
        sx={{
          color: "gray",
          "&:hover": {
            color: "black",
          },
        }}
        onClick={handleDeleteClick}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
      <IconButton
        sx={{
          color: "gray",
          "&:hover": {
            color: "black",
          },
        }}
        onClick={handleStarClick}
      >
        {checked ? (
          <StarIcon
            fontSize="small"
            style={{ color: "yellow", stroke: "gray", strokeWidth: 2 }}
          />
        ) : (
          <StarOutlineIcon
            fontSize="small"
            sx={{
              color: "gray",
              "&:hover": {
                color: "black",
              },
            }}
          />
        )}
      </IconButton>
      <IconButton
        sx={{
          color: liked ? "green" : "gray",
          "&:hover": {
            color: "black",
          },
        }}
        onClick={handleLikeClick}
      >
        <ThumbUpOffAltIcon fontSize="small" />
      </IconButton>
      <IconButton
        sx={{
          color: disliked ? "red" : "gray",
          "&:hover": {
            color: "black",
          },
        }}
        onClick={handleDislikeClick}
      >
        <ThumbDownOffAltIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default MessageFeatures;
