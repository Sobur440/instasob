/* eslint-disable @next/next/no-img-element */
"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { CiCirclePlus } from "react-icons/ci";
import { HiCamera } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { app } from "@/firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";

function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [postUploading, setPostUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const filePickerRef = useRef(null);
  const db = getFirestore(app);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = async () => {
    setFileUploaded(true);
    const storage = getStorage(app);
    const filename = new Date().getTime() + "-" + selectedFile.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is ${progress}% complete`);
      },
      (error) => {
        console.log(error);
        setFileUploaded(false);
        setSelectedFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setSelectedFileUrl(downloadUrl);
          setFileUploaded(false);
        });
      }
    );
  };

  const handleSubmit = async () => {
    setPostUploading(true);
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption,
      profileImg: session.user.image,
      image: selectedFileUrl,
      timestamp: serverTimestamp(),
    });
    setPostUploading(false);
  };

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center  max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="block">
          Instagram
        </Link>
        {/* search bar */}
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[210px]"
        />
        {/* Menu Items */}
        {session ? (
          <div
            className="flex gap-2 items-center"
            onClick={() => setIsOpen(true)}
          >
            <CiCirclePlus className="cursor-pointer text-2xl transform hover:scale-125 transition-all hover:text-red-600" />
            <img
              src={session.user.image}
              alt={session.user.name}
              className="w-10 h-10 rounded-[50%] cursor-pointer"
              onClick={() => signOut()}
            />
          </div>
        ) : (
          <button
            className="text-sm font-semibold text-blue-500"
            onClick={() => signIn()}
          >
            Log In
          </button>
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg  w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            {selectedFile ? (
              <img
                src={selectedFileUrl}
                alt="selected file"
                className={`w-full max-h-[250px] object-cover cursor-pointer ${
                  !fileUploaded ? "" : "animate-pulse"
                }`}
                onClick={() => setSelectedFile(null)}
              />
            ) : (
              <HiCamera
                className="text-5xl text-gray-400 cursor-pointer"
                onClick={() => filePickerRef.current.click()}
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={addImageToPost}
              className="hidden"
              ref={filePickerRef}
            />
          </div>
          <input
            type="text"
            maxLength="150"
            placeholder="Enter caption..."
            value={caption}
            className="m-4 border-center w-full outline-none text-center focus:ring-0"
            onChange={(e) => setCaption(e.target.value)}
          />
          <button
            disabled={
              !selectedFile ||
              caption.trim() === "" ||
              postUploading ||
              fileUploaded
            }
            className="w-full bg-red-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:brightness-100"
            onClick={handleSubmit}
          >
            Upload Post
          </button>

          <AiOutlineClose
            className="cursor-pointer absolute top-2 right-2 hover:text-red-600 transition duration-300"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default Header;
