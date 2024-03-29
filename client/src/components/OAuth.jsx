//import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

//Google gmail 
const OAuth = () => {
  //initialize dispatch and useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async() => {

    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider) //get the informations from google firebase
      //console.log(result);

      const fetchResult = await fetch('/api/auth/google', {     //fetch the google route from backend

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),  //send these 
      })

      const data = await fetchResult.json(); //covert it to json object and store in a variable(data )
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with Google', error);
    }

  }

  return (
    <button
    onClick={handleGoogleClick}
    type='button'
    className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
  >
    Continue with google
  </button>
  )
}

export default OAuth