import {useDispatch, useSelector} from 'react-redux'
import { useRef } from 'react'
import { useState } from 'react'
import { UpdateUserStart, UpdateUserSuccess, UpdateUserFailure } from '../redux/user/userSlice.js';
import { useEffect } from 'react';

export default function Profile() {
  const {currentUser,loading,error} = useSelector(state => state.user)
  const fileRef = useRef(null)

  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  console.log(formData);
  const handleUpdate = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})

  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      dispatch(UpdateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      dispatch(UpdateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(UpdateUserFailure(error.message))
    }
  }
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form className='flex flex-col gap-4'
      onSubmit={handleSubmit}>
        <input type='file' ref={fileRef} hidden accept='image/*'/>
        <img onClick={() => fileRef.current.click()} src={currentUser.avatar} alt='profile image'
        className='rounded-full h-24 w-24 object-cover cursor-pointer
        self-center mt-2' />
        <input type='text' placeholder= 'username'
        id='username'
        defaultValue={currentUser.username}
        className='border p-3 rounded-lg'
        onChange={handleUpdate}/>
        <input type='email' placeholder= 'email'
        id='email'
        defaultValue={currentUser.email}
        className='border p-3 rounded-lg'
        onChange={handleUpdate}/>
        <input type='password' placeholder= {currentUser.password}
        id='password'
        defaultValue={currentUser.password}
        className='border p-3 rounded-lg'
        onChange={handleUpdate}/>

        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase 
        hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading...': 'Update'}
        </button>
      </form>

      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>

      <p className='text-red-700 mt-5'>{error ? error: ''}</p>

      {updateSuccess && <p className='text-green-700 mt-5'>Profile updated successfully</p>}
      
    </div>
  )
}
