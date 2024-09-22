import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";

import { auth } from "../../config/firebase";

export async function uploadFile(file: File): Promise<string | null> {
  try {
    const storage = getStorage();
    const user = auth.currentUser;
    const fileRef = ref(storage, `uploads/${user!.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
    const downloadUrl = await getDownloadURL(fileRef);
    return downloadUrl;
  } catch (e) {
    return null;
  }
}

export async function getFiles(): Promise<string[] | null> {
  try {
    const storage = getStorage();
    const user = auth.currentUser;

    const filesRef = ref(storage, `uploads/${user!.uid}/`);
    const filesList = await listAll(filesRef);

    const fileUrls = await Promise.all(
      filesList.items.map((itemRef) => getDownloadURL(itemRef))
    );

    return fileUrls;
  } catch (e) {
    return null;
  }
}

export async function sendMessage(
  query: string,
  files: string[]
): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      body: JSON.stringify({
        query: query,
        files: files,
      }),
    });
    if (response.ok) {
      console.log(response);

      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

export async function deleteFile(fileName: string): Promise<boolean> {
  try {
    const storage = getStorage();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const fileRef = ref(storage, `uploads/${user.uid}/${fileName}`);
    await deleteObject(fileRef);
    return true;
  } catch (e) {
    console.error("Error deleting file:", e);
    return false;
  }
}
