import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { SignInStart,SignInSuccess,SignInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const[formData, setFormData] = useState({});
  const {loading, error} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
      });
      console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(SignInStart());
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    console.log(data);
    if(data.success === false){
      dispatch(SignInFailure(data.message));
      return;
    }
    dispatch(SignInSuccess(data));
    navigate('/home');
    } catch (error) {
      dispatch(SignInFailure(error.message));
    }
    
    
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4'>
        <input type="email" placeholder='email'
        className='border p-3 rounded-lg' id='email'onChange={handleChange}/>
        <input type="password" placeholder='password'
        className='border p-3 rounded-lg' id='password'onChange={handleChange}/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase'
        onClick={handleSubmit}
        disabled={loading}>{loading? 'loading...': 'Sign In'}</button>

        <OAuth />

        <div className='flex gap-2 mt-5'>
          <p>Don't have an account?</p>
          <Link to = {"/sign-up"}>
            <span className='text-blue-700'>Sign Up</span>
          </Link>
        </div>
        {error && <p className='text-red-500 text-center'>{error}</p>}
      </form>
    </div>
  )
}
