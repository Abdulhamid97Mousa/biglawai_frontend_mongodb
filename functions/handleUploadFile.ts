import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { Session } from "next-auth";
import { useRef } from "react";
import { APPLICATION } from "../utils/firebase";

const handleFileSelect = async (session: Session|null, chatId: string) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    var filePath = ''
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (file) {
        const path = `users/${session?.user?.email!}/chats/${chatId}`;
        const storage = getStorage(
          APPLICATION,
          "gs://chatgpt-messenger-20187.appspot.com/"
        );
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              filePath = downloadURL;
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    }
    return filePath
  };

export default handleFileSelect  