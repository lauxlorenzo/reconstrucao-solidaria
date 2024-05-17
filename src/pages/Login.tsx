import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import * as zod from 'zod'

import { Eye, EyeSlash } from '@phosphor-icons/react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom'


type PasswordType = 'password' | 'text'

//Validação dos campos de Login
const loginFormValidationSchema = zod.object({
  email: zod.string().email('Digite um e-mail válido'),
  password: zod.string().nonempty('Digite a sua senha')
})

type NewLoginFormData = zod.infer<typeof loginFormValidationSchema>

const Login = () => {
  //Inputs
  const [
    inputPasswordType, 
    setInputPasswordType
  ] = useState<PasswordType>('password')

  const handleTogglePasswordType = ( type:PasswordType ) => {
    switch ( type ) {
      case 'password':
        setInputPasswordType('text')
        return
      case 'text':
      default:
        setInputPasswordType('password')
        return
    }
  }

  const loginForm = useForm<NewLoginFormData>({
    resolver: zodResolver(loginFormValidationSchema)
  })

  const { register, handleSubmit, formState, reset } = loginForm

  const { errors } = formState

  const handleLoginSubmit = (data: NewLoginFormData) => {
    console.log(data)
    reset()
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
                Faça login ou registre-se para se conectar com a comunidade de doações.
              </p>
            </header>
            <form 
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(handleLoginSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label 
                  className="font-sans font-semibold text-sm text-gray-800"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <input
                  className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-blue', {
                    'border-red': errors.email,
                    'focus:border-red' : errors.email,
                  })} 
                  type="email" 
                  id="email"
                  placeholder="Digite seu e-mail"
                  {...register('email')}
                />
                { errors.email  && (
                  <span className="text-red text-sm"> {errors.email?.message} </span>)
                }
              </div>

              <div className="flex flex-col gap-2 relative">
                <label
                  className="flex justify-between font-sans font-semibold text-sm text-gray-800" 
                  htmlFor="password"
                >
                  Senha
                  <a 
                    className="text-blue hover:text-lg-blue hover:underline"
                    href="#"
                  >
                    Esqueceu a senha?
                  </a>
                </label>
                <input
                  className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-blue', {
                     'border-red': errors.password,
                    'focus:border-red' : errors.password,
                  })}  
                  id="password"
                  type={inputPasswordType}
                  placeholder="Digiete sua senha"
                  {...register('password')}
                />
                <button
                  className="absolute right-4 top-11 text-gray-400"
                  type='button'
                  onClick={() => handleTogglePasswordType(inputPasswordType)}
                >
                  { inputPasswordType === 'password' ? <EyeSlash /> : <Eye /> }
                </button>
                { errors.password  && (
                  <span className="text-red text-sm"> {errors.password?.message} </span>)
                }
              </div>

              <footer className="flex flex-col gap-8">
                <button
                  className="bg-blue text-white font-bold py-4 rounded outline-none hover:bg-lg-blue hover:ring-1 hover:ring-blue focus:ring-2 focus:ring-blue"
                >
                  Entrar
                </button>
                <span className="text-gray-600">
                  Ainda não tem uma conta? 
                <Link 
                  className="text-blue hover:text-lg-blue hover:underline"
                  to="/register"> Inscreva-se
                </Link> 
                </span>
              </footer>
            </form>
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