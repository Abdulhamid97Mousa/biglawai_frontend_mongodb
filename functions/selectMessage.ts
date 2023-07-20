import { Session } from "next-auth";
import { Message } from "@/typings"; // your Message type

const selectMessage = async (
  setChecked: React.Dispatch<React.SetStateAction<boolean>>,
  checked: boolean,
  session: Session | null,
  message: Message,
  chatId: string
) => {
  const response = await fetch("/api/SelectMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      checked: !checked, // we're toggling the checked value
      userId: session?.user?.email,
      messageId: message.messageId,
      chatId,
    }),
  });

  // if the request is successful, update the checked state
  if (response.ok) {
    setChecked(!checked);
  }
};

export default selectMessage;
