import { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, seterror] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      seterror("Please enter a valid email address");
      return; 
    }

    if(!password){
      seterror("Please enter the valid password");
      return;
    }

    seterror("");


    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email, password
      });

      const {token, role} = response.data;
      if(token){
        localStorage.setItem("token", token);
        
        //redirect based on role
        if(role === "admin"){
          navigate("/admin/dashboard");
        }else{
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        seterror(error.response.data.message);
      }else{
        seterror("Something went wrong, try again later");
      }
      
    }

  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-xs mb-6">Please enter your login details</p>

        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="example@gmail.com"
            label="Email address"
            value={email}
            onChange={({ target }) => setemail(target.value)}
          />

          <Input
            type="password"
            placeholder="••••••••"
            label="Password"
            value={password}
            onChange={({ target }) => setpassword(target.value)}
          />

          { error && <p className='text-red-800 font-medium'>{error}</p>}

          <button type='submit' className='btn-primary'>Login</button>

          <p>
            Don't have an account?{""}
            <Link className='font-medium underline'to={"/signup"}>SignUp</Link>
          </p>

        </form>
      </div>
    </AuthLayout>
  );
}

export default Login;
