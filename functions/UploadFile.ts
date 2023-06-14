import { getStorage, ref, uploadBytesResumable, getDownloadURL, StorageReference } from "firebase/storage";
import { APPLICATION, refStorage } from "../utils/firebase";
const storage = getStorage();


export const uploadFile = async(file:File, path:string, chatId: string) => {

  const storage = getStorage(APPLICATION, 'gs://chatgpt-messenger-20187.appspot.com/');
  const storageRef = ref(storage, path);
  let downloadUrl = '';
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
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
        downloadUrl = downloadURL;
        console.log('File available at', downloadURL); 
      });
    }
  );
  return uploadTask.snapshot.ref.bucket as unknown;    
}