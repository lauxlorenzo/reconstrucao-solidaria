import { Checkbox } from "@/components/ui/checkbox"
import { Plus } from "lucide-react"

const Filter = () => {
  return (
    <div className="flex flex-row justify-between pl-9 pr-9 pb-5 pt-5 items-center">
      <div className="flex flex-row gap-10 items-center">
        <h1 className="text-zinc-500 font-inter font-semibold">Filtro: </h1>
        <div className="flex flex-row items-center gap-1">
          <Checkbox id="volunteer" />
          <label
            htmlFor="volunteer"
            className="text-md font-inter text-zinc-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Voluntários
          </label>
        </div>

        <div className="flex flex-row items-center gap-1">
          <Checkbox id="donation" />
          <label
            htmlFor="donation"
            className="text-md font-inter text-zinc-500 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Doações
          </label>
        </div>
      </div>

      <div>
        <button className="bg-green py-2 px-4 rounded-full hover:bg-opacity-80">
          <span className="flex flex-row gap-1 items-center text-white">
            <Plus size={18} />
            Criar
          </span>
        </button>
      </div>
    </div>
  )
}

export default Filter