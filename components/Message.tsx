import React, { FormEventHandler, useEffect, useState } from "react";
import { Session } from "next-auth";
import selectMessage from "../functions/selectMessage";
import { Message as MessageType } from "@/typings"; // your Message type
import MessageFeatures from "./MessageFeatures";
import {
  getStreamed,
  editMessage,
  likeMessage,
  undoLikeMessage,
  dislikeMessage,
  undoDislikeMessage,
  deleteMessage,
} from "../functions/getMessageService"; // import getMessageService

type Props = {
  message: MessageType;
  chatId: string;
  session: Session | null;
};

const Message = ({ message, chatId, session }: Props) => {
  const isCreatedByUser = message.createdBy !== "ChatGPT";
  const isCreatedByChatGPT = message.createdBy === "ChatGPT";
  const [checked, setChecked] = useState(message.checked);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [messageWords, setMessageWords] = useState<string[]>([]);
  const [streamed, setStreamed] = useState(message.streamed);
  const streamSpeed = 25; // speed of the stream in milliseconds, adjust as needed

  useEffect(() => {
    if (isCreatedByChatGPT) {
      if (streamed) {
        setDisplayedMessage(message.content);
      } else {
        setMessageWords(message.content.split(" "));
      }
    }
  }, [message.content, isCreatedByChatGPT, streamed]);

  useEffect(() => {
    if (messageWords.length > 0 && displayedMessage !== message.content) {
      let words = [...messageWords];

      const intervalId = setInterval(async () => {
        const newDisplayedMessage = displayedMessage + " " + words[0];
        setDisplayedMessage(newDisplayedMessage);
        words = words.slice(1);

        setMessageWords(words);

        if (words.length === 0) {
          try {
            await getStreamed(message.messageId);
            setStreamed(true);
          } catch (error) {
            console.error(error);
          }
        }
      }, streamSpeed);

      return () => clearInterval(intervalId);
    }
  }, [
    messageWords,
    streamSpeed,
    displayedMessage,
    message.content,
    message.messageId,
  ]);

  const avatarImageSrc = isCreatedByChatGPT
    ? "https://user-uploads-thumbs.shutterstock.com/aws-cloudfront-user-asset-uploads-prod-us-east-1/uploads/09a8e748-3309-412a-91d0-96787a52622a/p/b5d5bdfb5a22f98ecb3dceafc3c25ff1f0d41201/1681627208118/Picture1/png/1681627211/1500x1500/fit/0e5e82f5a287f328b5c6fcb18ca9d9e2b7986a21/Picture1.jpg"
    : session?.user?.image ||
      `https://ui-avatars.com/api/?name=${session?.user?.name}`;

  const bgColor = isCreatedByUser
    ? "bg-white"
    : "border-b border-t border-black/10 dark:border-gray-900/50 bg-gray-50 dark:bg-[#444654]";

  const handleStarClick = () => {
    selectMessage(setChecked, checked, session, message, chatId);
  };

  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    // other existing code...
    // count words of the message
    if (message.content) {
      setWordCount(message.content.split(" ").length);
    }
  }, [message.content]);

  // Introduce new state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  // Handler for clicking the edit button
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Handler for clicking the cancel button
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditContent(message.content); // Reset the edit content to the current message content
  };

  // Handler for clicking the save button
  const handleSaveClick = async () => {
    try {
      await editMessage(message.messageId, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Handler for form submission
  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/EditMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messageId: message.messageId,
        newContent: editContent,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to update message");
    }

    setIsEditing(false); // Switch off edit mode
  };

  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const handleCopyClick = () => {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(message.content);
      setShowCheckIcon(true);
      setTimeout(() => {
        setShowCheckIcon(false);
      }, 3000);
    } else {
      // Fallback for browsers that don't support clipboard API
      let textarea = document.createElement("textarea");
      textarea.textContent = message.content;
      textarea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy"); // Security exception may be thrown by some browsers.
        setShowCheckIcon(true);
        setTimeout(() => {
          setShowCheckIcon(false);
        }, 3000);
      } catch (ex) {
        console.warn("Copy to clipboard failed.", ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };

  // Additional states
  const [liked, setLiked] = useState(message.liked);
  const [disliked, setDisliked] = useState(message.disliked);

  // Update the like/dislike handlers
  const handleLikeClick = async () => {
    try {
      if (liked) {
        await undoLikeMessage(message.messageId);
        setLiked(false);
      } else {
        await likeMessage(message.messageId);
        setLiked(true);
        if (disliked) {
          handleDislikeClick(); // If it was disliked, remove the dislike
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDislikeClick = async () => {
    try {
      if (disliked) {
        await undoDislikeMessage(message.messageId);
        setDisliked(false);
      } else {
        await dislikeMessage(message.messageId);
        setDisliked(true);
        if (liked) {
          handleLikeClick(); // If it was liked, remove the like
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Create a new state variable to handle deletion confirmation
  const [isDeleting, setIsDeleting] = useState(false);
  // The state for confirming deletion
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(!confirmDelete); // toggle confirmDelete state
  };

  // Create a new function to handle the deletion
  const handleConfirmDelete = async () => {
    try {
      await deleteMessage(message.messageId);
      setIsDeleting(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`py-3 text-black ${bgColor} ${
        isCreatedByUser && "text-left justify-stretch justify-self-auto "
      }`}
    >
      <div className="flex flex-col">
        <div className="flex justify-end ">
          <MessageFeatures
            message={message}
            chatId={chatId}
            isEditing={isEditing}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
            showCheckIcon={showCheckIcon}
            handleCopyClick={handleCopyClick}
            confirmDelete={confirmDelete}
            handleConfirmDelete={handleConfirmDelete}
            handleDeleteClick={handleDeleteClick}
            checked={checked}
            handleStarClick={handleStarClick}
            liked={liked}
            handleLikeClick={handleLikeClick}
            disliked={disliked}
            handleDislikeClick={handleDislikeClick}
            handleEditClick={handleEditClick}
          />
        </div>

        <div className="flex flex-row justify-between ">
          <div className="ml-5 mt-1 mb-1 mr-[100px] text-left flex space-x-5 ">
            <img
              src={avatarImageSrc}
              alt="User Avatar"
              className="h-8 w-8 rounded-md ml-10"
            />
            {/*this is the edit field width*/}
            <form onSubmit={handleFormSubmit} className="w-full">
              {isEditing ? (
                <div className="w-full">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="editable-message w-full "
                  />
                </div>
              ) : (
                <div className="pt-1 text-lg text-justify text-black ml-5 flex-1 flex space-x-5 flex-grow min-w-0 ">
                  {isCreatedByChatGPT ? displayedMessage : message.content}
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="flex justify-between mt-3 ml-[127px] text-sm text-black/50">
          <span>Word count: {wordCount}/1000</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
