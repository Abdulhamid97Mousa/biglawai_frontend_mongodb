"use client";

import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import NewChat from "../components/NewChat";
import ChatRow from "./ChatRow";
import deleteChat from "../functions/deleteChat";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import CloseSidebarButton from "./CloseSidebarButton";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type Chat = {
  id: string;
  createdAt: Date;
  // include other properties of the chat object here as needed
};

type SideBarProps = {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar: FC<SideBarProps> = ({ setShowSidebar }) => {
  const { data: session } = useSession();
  const [chats, setChats] = useState<Chat[]>([]);
  const [deletingChatId, setDeletingChatId] = useState<string | null>(null);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigationToDashboard = () => {
    router.push(`/Logged-in/Dashboard`);
    handleClose();
  };

  const handleLogout = () => {
    signOut();
    handleClose();
  };

  useEffect(() => {
    if (session) {
      fetch(`/api/GetChatRows?userId=${session.user?.email}`)
        .then((response) => response.json())
        .then((data) => setChats(data));
    }
  }, [session]);

  const handleNewChat = (newChat: Chat) => {
    setChats((prevChats) => [...prevChats, newChat]);
  };

  const removeChat = useCallback(
    async (id: string) => {
      setDeletingChatId(id); // Start deletion

      // Find the index of the current chat in the array
      const currentChatIndex = chats.findIndex((chat) => chat.id === id);

      // Delete the chat
      await deleteChat(session, id);

      // Filter out the deleted chat from state
      const updatedChats = chats.filter((chat) => chat.id !== id);
      setChats(updatedChats);

      // If there's no more chats left, navigate to /Tryout
      if (updatedChats.length === 0) {
        router.push("/Dashboard");
      } else {
        let nextChatId;
        // If there is a chat before the current one, navigate to it
        if (currentChatIndex > 0) {
          nextChatId = updatedChats[currentChatIndex - 1].id;
          router.push(`/Logged-in/chat/${nextChatId}`);
        }
        // Otherwise, navigate to the chat after the current one
        else {
          nextChatId = updatedChats[currentChatIndex]?.id;
        }
        if (nextChatId) {
          //  router.push(`/Logged-in/chat/${nextChatId}`);
        }
      }
      setDeletingChatId(null); // End deletion
    },
    [chats, session, router]
  ); // Add dependencies for useCallback

  const groupedChats = chats.reduce<Record<string, Chat[]>>((acc, chat) => {
    let label = "";
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (dayjs(chat.createdAt).isValid()) {
      label = dayjs(chat.createdAt).format("MMM D, YYYY");
    }

    if (!acc[label]) {
      acc[label] = [];
    }

    // Sort the chats within each group by their createdAt timestamp, from newest to oldest:
    acc[label].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    acc[label].push(chat);

    return acc;
  }, {});

  return (
    <div className=" p-5 flex flex-col justify-between h-full">
      <div className="bg-[#202123] rounded-md">
        <div className="mb-4 flex flex-row gap-2">
          <div className="rounded-lg bg-[#202123] w-full">
            <NewChat onNewChat={handleNewChat} />
          </div>
          <div>
            <CloseSidebarButton setShowSidebar={setShowSidebar} />
          </div>
        </div>

        <div className="flex-grow max-h-[76vh] overflow-y-auto bg-[#202123]">
          {Object.keys(groupedChats)
            .reverse()
            .map((dateHeader) => (
              <div key={dateHeader}>
                <h2 className="text-[#8e8ea0] mb-1 mt-1 ml-5">{dateHeader}</h2>
                {groupedChats[dateHeader].map((chat) => (
                  <ChatRow
                    key={chat.id}
                    id={chat.id}
                    removeChat={removeChat}
                    deletingChatId={deletingChatId}
                    userEmail={session?.user?.email || ""}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>

      <div className="bg-[#202123] rounded-md border-white/40 border-2">
        {session && (
          <div className="cursor-pointer hover:opacity-50 flex items-center">
            <img
              src={
                session.user?.image ||
                `https://ui-avatars.com/api/?name=${session.user?.name}`
              }
              alt="Profile Picture"
              className="ml-4 h-8 w-8 rounded-md cursor-pointer space-y-2 mt-4 mb-6 hover:opacity-50"
            />
            <div className="ml-3 mr-3 flex-1">
              <span className="text-sm text-white overflow-wrap break-all">
                {session.user?.name}
              </span>
            </div>
            <div className="mr-5">
              <IconButton
                aria-label="more"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon className="text-white cursor-pointer" />
              </IconButton>
              <Menu
                id="menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleNavigationToDashboard}>
                  Go to Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
