import  { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Input/ProfilePhotoSelector';

function Signup() {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, seterror] = useState(null);

  const handleSignUp = async (e) => {
      e.preventDefault();
  
      if(!fullName){
        seterror("Please enter a Full Name");
        return; 
      }
  
      if(!password){
        seterror("Please enter the valid password");
        return;
      }
 
  
      seterror("");
    }

      //SignUp API call
  
  
  
  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs mb-6 mt-[5px]'>Join us today by entering your details</p>


        <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

        </div>

      </form>
      </div>

      

    </AuthLayout> 
  )
}

export default Signup