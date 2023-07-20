import { useRef } from "react";
import { Session } from "next-auth";

const handleFileSelect = async (
  file: File,
  session: Session | null,
  chatId: string
) => {
  let filePath = "";

  let formData = new FormData();
  formData.append("file", file);
  formData.append("chatId", chatId);

  try {
    const response = await fetch("/api/SendUploadedFile", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    filePath = data.file;
  } catch (error) {
    console.error("Error uploading file:", error);
  }

  return filePath;
};

export default handleFileSelect;
