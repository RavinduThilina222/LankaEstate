import React from 'react'
import { app } from '../firebase';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { SignInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      console.log(result);

      const res = await fetch('/api/auth/google', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        }),
      })

      console.log(res);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      dispatch(SignInSuccess(data))



      // Redirect to /home after successful sign-in
      navigate('/home')

      console.log(data)
    } catch (error) {
      console.error('Could not sign in with Google', error)
    }
  }

  return (
    <button type='button'
    onClick={handleGoogleClick}
    className='bg-red-700 text-white p-3 
    rounded-lg uppercase hover:opacity-80'>
      Continue with Google
    </button>
  )
}