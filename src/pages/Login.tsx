import React from 'react';

const Login = () => {
  return (
    <div className='bg-blue w-1/2 h-screen float-end flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-bold text-white'>Login</h1>s
      <div className=''>
        <form action="">
          <input type="email" />
          <input type="text" />
          <button type='submit'>Login</button>
          <button type='submit'>Registrar-se</button>
        </form>
      </div>
    </div>
  )
}

export default Login