import { GoogleLogo } from '@phosphor-icons/react'
import Logo from '../assets/Logo.png'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../services/firebaseConfig'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
  const {authenticated, setAuthenticated} = useContext(AuthContext)
  const navigate = useNavigate();

  // Função de autenticação do Google
  const handleLoginSubmit = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    setAuthenticated(true)
    navigate('/')

  }

  // HTML Página 
  return (
    <div className="grid grid-cols-2 h-screen bg-gray-50">
      <div className='flex justify-center items-center'>
        <div className="py-10 px-28">
          <main className="flex flex-col mt-4 gap-10 w-full max-w-[384px]">
            <header className="flex flex-col gap-4 w-full max-w-[350px]">
              <h1 className="font-sans text-4xl font-bold text-gray-800">
                Acesse a plataforma
              </h1>
              <p className="font-sans font-normal text-base text-gray-600">
                Faça login com o Google para se conectar com a comunidade de doações.
              </p>
            </header>
            
            <button 
              type='button' 
              className='bg-red py-3 rounded-lg flex items-center justify-center text-white'
              onClick={handleLoginSubmit}
            >
              <GoogleLogo className='size-5 mr-2' />
              Entrar com Google
            </button>
            
          </main>
        </div>
      </div>
      <div className="bg-img-enchente bg-cover bg-no-repeat flex justify-center items-center">
        <img src={Logo} alt="Vertigo" className="w-80" />
      </div>
    </div>
  )
}

export default Login;