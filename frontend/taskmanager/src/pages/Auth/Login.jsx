import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';

function Login() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");

  const navigate = useNavigate();

  //handle login  form submit
  const handleLogin = async (e) =>{
    e.preventDefault();
  }
  return (
    <AuthLayout>
      <div className='lg:w-[70] h-3/4 md:h-full  flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back  </h3>
          <p className='text-xs mb-6'>Please enter ypur Login Details</p>


          <form onSubmit={handleLogin}>
            <Input
            type='text'
            placeholder='example@gmail.com'
            label='Email address'
            value={email}
            onChange={({target})=>setemail(target.value)}/>
          </form>
      
      </div>
    </AuthLayout>
  )
}

export default Login