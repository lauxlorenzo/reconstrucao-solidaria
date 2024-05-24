import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/authContext"
import { ChevronDown, LogOut, UserRound, HeartHandshakeIcon } from "lucide-react"

const Header = () => {
  const { currentUser, logout } = useAuth()
  return (
    <div className="bg-blue w-screen h-20 flex justify-between">
      <div className="flex items-center ml-9">
        <h1 className="text-white font-inter font-semibold">RECONSTRUÇÃO SOLIDÁRIA</h1>
      </div>

      <div className="flex items-center mr-9">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <button className="p-4">
              {currentUser.displayName ? 
                <span className="flex flex-row gap-2 text-white">currentUser.displayName <ChevronDown /></span> 
                : <span className="flex flex-row gap-2 text-white">Perfil <ChevronDown /></span>}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem><button className="flex flex-row items-center gap-2"><UserRound size={18}/>Perfil</button></DropdownMenuItem>
            <DropdownMenuItem><button className="flex flex-row items-center gap-2"><HeartHandshakeIcon size={18}/>Minhas Doações</button></DropdownMenuItem>
            <DropdownMenuItem><button className="text-red flex flex-row items-center gap-2" onClick={logout}><LogOut size={18}/> Sair</button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default Header