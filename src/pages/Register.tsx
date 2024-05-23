import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { clsx } from 'clsx'
import * as zod from 'zod'

import { Eye, EyeSlash } from '@phosphor-icons/react'
import Logo from '../assets/Logo.png'
import Background from '../assets/Background_Login.png'
import { Link, json, useNavigate } from 'react-router-dom'

import { useAuth } from '../context/authContext'


type PasswordType = 'password' | 'text'

const loginFormValidationSchema = zod.object({
  email: zod.string().email('Digite um e-mail válido'),
  password: zod.string().nonempty('Digite a sua senha')
})

type NewLoginFormData = zod.infer<typeof loginFormValidationSchema>

export default function Register() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) navigate('/')
  }, [])

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current?.value, passwordRef.current?.value)
      navigate('/')
    } catch(error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError('Esse endereço de e-mail já foi cadastrado')
      }
    }

    setLoading(false)
  }

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

  const { register, formState, reset } = loginForm

  const { errors } = formState

  // HTML Página 
  return (
    <div className="grid grid-cols-2 h-screen bg-gray-50">
      <div className='flex justify-center items-center'>
        <div className="py-10 px-28">
          <main className="flex flex-col mt-4 gap-10 w-full max-w-[384px]">
            <header className="flex flex-col gap-4 w-full max-w-[350px]">
              <h1 className="font-sans text-4xl font-bold text-gray-800">
                Cadastre-se
              </h1>
              <p className="font-sans font-normal text-base text-gray-600">
                Registre-se para se conectar com a comunidade de doações.
              </p>
            </header>
            <form 
              className="flex flex-col gap-4"
              onSubmit={handleSubmit}
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
                    'border-red': error,
                    'focus:border-red' : error,
                  })}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={emailRef}
                  required
                  placeholder="Digite seu e-mail"
                />
                { error  && (
                  <span className="text-red text-sm"> {error} </span>)
                }
              </div>

              <div className="flex flex-col gap-2 relative">
                <label
                  className="flex justify-between font-sans font-semibold text-sm text-gray-800" 
                  htmlFor="password"
                >
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type={inputPasswordType}
                  ref={passwordRef}
                  required
                  className={clsx('px-4 py-3 bg-white text-sm text-gray-800 leading-5 border border-gray-200 rounded placeholder:text-gray-200 outline-none focus:border-blue', {
                     'border-red': errors.password,
                    'focus:border-red' : errors.password,
                  })}  
                  placeholder="Digite sua senha"
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
                  Registrar
                </button>
                <span className="text-gray-600">
                  Já possui uma conta? 
                <Link 
                  className="text-blue hover:text-lg-blue hover:underline"
                  to="/login"> Faça Login
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