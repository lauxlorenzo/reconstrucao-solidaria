import React from 'react';
import { useAuth } from '../context/authContext';

type Props = {}


const Home = (props: Props) => {
  const { logout } = useAuth()
  return (
    <>
      <h1>Home</h1>
      <button 
        className='p-3 bg-red rounded text-white'
        onClick={logout}
        >Sair</button>
    </>
  )
}

export default Home