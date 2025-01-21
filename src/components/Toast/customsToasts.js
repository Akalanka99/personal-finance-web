import { useToast } from "./ToastService";
import { AlertCircle, LogIn, UserCheck, Zap} from 'react-feather'

const toast=useToast();

const handleLogin = () => {
    toast.open(
      <div className='flex gap-2 bg-blue-300 text-blue-800 p-4 rounded-lg shadow-lg'>
        <UserCheck size={40} />
        <div>
          <h3 className='font-bold'>Authenticated</h3>
          <p className='text-sm'>You are logged in successfully</p>
        </div>
      </div>
    )
  }

export default handleLogin;  