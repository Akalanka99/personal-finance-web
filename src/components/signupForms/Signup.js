import { useState } from 'react';
import { signupFields } from '../../constants/signupForms/formFields';
import FormAction from "./FormAction";
import Input from "./Input";
import GoogleLoginButton from './SignInWithGoogle';
import { useToast } from '../Toast/ToastService';
import { useNavigate, Navigate } from "react-router-dom";
import { UserCheck} from 'react-feather'
import { auth} from '../../config/firebase-config';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);
  const toast=useToast();
  const navigate=useNavigate();
  const { isAuth } = useGetUserInfo();


  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (signupState['password'] !== signupState['confirm-password']) {
      toast.open(
        <div className='flex gap-2 bg-red-300 text-red-700 p-4 rounded-lg shadow-lg'>
            <UserCheck size={40} />
            <div>
                <h3 className='font-bold'>Signup failed</h3>
                <p className='text-sm'>Passwords not matching</p>
            </div>
        </div>
    );
      return;
    }
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount=async()=>{
    let errorMessage = ""; // Declare the error message variable outside the blocks

    try {
      console.log("Email:", signupState['email-address']);
      console.log("Password:", signupState['password']);

      const userCredential = await createUserWithEmailAndPassword(auth, signupState['email-address'], signupState['password']);
      const user = userCredential.user;

      // Set user's display name
      await updateProfile(user, { displayName: signupState['name'] });

      // Optionally, store additional user information in local storage or state for further use
      

      const authInfo={
        userID:user.uid,
        name:signupState['name'],
        isAuth:true,
        provider:'password'
      }
      localStorage.setItem('auth', JSON.stringify(authInfo));

      toast.open(
        <div className='flex gap-2  bg-green-400 text-green-800 p-4 rounded-lg shadow-lg'>
            <UserCheck size={40} />
            <div>
                <h3 className='font-bold'>Authenticated</h3>
                <p className='text-sm'>You are Signed up successfully</p>
            </div>
        </div>
    );
      
    } catch (error) {
      console.log(error);

        if (error.code === "auth/wrong-password") {
            errorMessage = "Incorrect password. Please try again.";
        } else {
            errorMessage = "Error: " + error.message;
        }

        toast.open(
            <div className='flex gap-2 bg-red-300 text-red-700 p-4 rounded-lg shadow-lg'>
                <UserCheck size={40} />
                <div>
                    <h3 className='font-bold'>Signup failed</h3>
                    <p className='text-sm'>{errorMessage}</p>
                </div>
            </div>
        );
      
    }

  }

  if (isAuth) {
    
    return <Navigate to="/dashboard" />;
  }

    return(
        <form className="mt-8" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Signup" />
          <div className="group relative flex justify-center">
          <span className="text-slate-500">or</span>
        </div>
          <GoogleLoginButton/>
        </div>

         

      </form>
    )
}