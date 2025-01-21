import { useState } from 'react';
import { loginFields } from '../../constants/signupForms/formFields';
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import GoogleLoginButton from './SignInWithGoogle';
import { useToast } from '../Toast/ToastService';
import { auth } from '../../config/firebase-config';
import { UserCheck} from 'react-feather'
import { useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';


const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){

    const [loginState,setLoginState]=useState(fieldsState);
    const toast=useToast();
    const navigate=useNavigate();
    const { isAuth } = useGetUserInfo();
    

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    //Handle Login API Integration here
const authenticateUser = async () =>{
    let errorMessage = ""; // Declare the error message variable outside the blocks

    try {
        console.log("Email:", loginState['email-address']);
        console.log("Password:", loginState['password']);
        const userCredential = await signInWithEmailAndPassword(auth, loginState['email-address'], loginState['password']);
        const user = userCredential.user;
        const uid = user.uid;
        const displayName = user.displayName;



        const authInfo={
            userID:uid,
            name:displayName,
            isAuth:true
          }
        localStorage.setItem('auth', JSON.stringify(authInfo));

        toast.open(
            <div className='flex gap-2  bg-green-400 text-green-800 p-4 rounded-lg shadow-lg'>
                <UserCheck size={40} />
                <div>
                    <h3 className='font-bold'>Authenticated</h3>
                    <p className='text-sm'>You are logged in successfully</p>
                </div>
            </div>
        );
        navigate('/dashboard');
    } catch(error) {
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
                    <h3 className='font-bold'>Login failed</h3>
                    <p className='text-sm'>{errorMessage}</p>
                </div>
            </div>
        );
    }
};

if (isAuth) {
    return <Navigate to="/dashboard" />;
  }


    return(
        <form className="mt-8" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
        </div>
        

        <FormExtra/>
        <FormAction handleSubmit={handleSubmit} text="Login"/>
        <div className="group relative flex justify-center">
        <span className="text-slate-500">or</span>
        </div>
        <GoogleLoginButton/>
        
      </form>
    )
}