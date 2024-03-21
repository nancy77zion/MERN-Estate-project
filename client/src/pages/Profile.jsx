//import React from 'react'
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"
import {getStorage,ref,uploadBytesResumable,getDownloadURL} from "firebase/storage"
import { app } from "../firebase"

const Profile = () => {

  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined) //state to store the file
  const [filePerc, setFilePerc] = useState(0); //state to store the file percentage
  const [fileUploadError, setFileUploadError] = useState(false); //state to store the error
  const [formData, setFormData] = useState({});

  console.log(formData);
  console.log(filePerc)
  console.log(fileUploadError);
  //console.log(file);

  const {currentUser} = useSelector((state) => state.user)

  useEffect(() => {
    if (file) {
      handleFileUpload()
    }
  },[file]);

  const handleFileUpload = () => {
    const storage = getStorage(app)  //stores the file in firebase storage

    const fileName = new Date().getTime() + file.name //gives a unique filename so two files can't be uploaded.

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('upload is ' + progress + '% done'); 
         setFilePerc(Math.round(progress)); 
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>``
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={(e)=> setFile(e.target.files[0])}/>  
        <img src={formData.avatar || currentUser.avatar} alt="profile-pic"  className="rounded-full h-24 w-24 object-cover cursor-pointer self-center m-2" onClick={()=> fileRef.current.click()}/>
        <p className='text-sm self-center'>
        {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>

        <input type="text" className="border p-3 rounded-lg" placeholder="username" id="username"/>
        <input type="email" className="border p-3 rounded-lg" placeholder="email" id="email" />
        <input type="text" className="border p-3 rounded-lg" placeholder="password" id="password"/>
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">Update</button>

        <div className=" flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">sign out</span>
        </div>
      </form>
    </div>
  )
}

export default Profile