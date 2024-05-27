import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateDonationForm from "./CreateDonationForm"

const CreateButton = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button className="bg-green py-2 px-4 rounded-full hover:bg-opacity-80">
            <span className="flex flex-row gap-1 items-center text-white">
              <Plus size={18} />
              Criar
            </span>
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-max max-h-screen overflow-auto">
          <DialogHeader>
            <DialogTitle>Reconstrução Solidária</DialogTitle>
            <DialogDescription>
              Selecione o tipo de doação e preencha os campos atentamente.
            </DialogDescription>
          </DialogHeader>

          <div className="">
            <Tabs defaultValue="account" className="">
              <TabsList>
                <TabsTrigger value="donation">Doação</TabsTrigger>
                <TabsTrigger value="volunteer">Voluntário</TabsTrigger>
              </TabsList>
              <TabsContent value="donation"><CreateDonationForm /></TabsContent>
              <TabsContent value="volunteer">Voluntariado</TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateButton