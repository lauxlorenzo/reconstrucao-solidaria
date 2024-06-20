import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { useDropzone } from "react-dropzone"



const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];



// Definindo esquema de cada campo
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Nome inválido.",
  }),

  city: z.string().min(2, {
    message: "Cidade inválida."
  }),

  condition: z.string({
    required_error: "Selecione uma condição"
  }),

  description: z.string().max(250, {
    message: "A descrição deve ter no máximo 250 caracteres."
  }).min(10, {
    message: "A descrição deve ter no mínimo 10 caracteres."
  }),

  adImage: z
    .any()
    .refine((files) => files?.length >= 1, { message: 'Você precisa enviar uma ou mais imagens.' })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, { message: "Tamanho máximo de 5MB." })
    .refine((files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type), { message: "Apenas .jpg, .jpeg, .png e .webp" }),
})


const CreateDonationForm = () => {
  const [preview, setPreview] = useState<string[] | null>([]);

  // Definindo o formulário
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      city: "",
      description: "",
      adImage: undefined,
      condition: "",
    },
  })

  // Drop-zone
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader;
    let images: Array<string> = [];

    if (acceptedFiles) {
      for (let i = 0; i < acceptedFiles.length; i++) {
        images.push(URL.createObjectURL(acceptedFiles[i]));
      }
    }

    setPreview(images)
    file.readAsDataURL(acceptedFiles[0])
  }, [])


  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 5,
    onDrop
  });


  // Função executada quando o formulário é enviado
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (typeof acceptedFiles[0] === 'undefined') return;

    console.log(values)
    console.log(acceptedFiles)
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid columns-4 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} placeholder="Medidas, Peso, Funcionalidades, Etc..." />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem className="col-span-1">
              <FormLabel>Condição</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="semi-novo">Semi-novo</SelectItem>
                  <SelectItem value="com-defeito">Com defeito</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="adImage"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormControl>
                <div {...getRootProps({ className: "bg-zinc-200 rounded-lg border-dashed border-2 border-zinc-300 flex justify-center items-center px-2 py-8 hover:bg-zinc-300 hover:border-zinc-400 hover:cursor-pointer transition-all" })}>
                  <input {...field} {...getInputProps()} onChange={(e) => {field.onChange(e.target.files)}} />
                  {
                    isDragActive ?
                      <p className="font-semibold text-zinc-400">Solte os arquivos aqui...</p> :
                      <p className="font-semibold text-zinc-400">Clique ou arraste para enviar</p>
                  }
                </div>
              </FormControl>

              {preview && (
                <div className="flex flex-row gap-2">
                  {preview.map((img, i) => {
                    return (
                      <img src={img} key={i} className="w-20 h-20 border-2 border-zinc-300 rounded-lg flex" alt="Upload preview" />
                    )
                  })}
                </div>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-4">
          <Button type="submit" className="bg-green">Criar</Button>
        </div>

      </form>
    </Form>
  )
}

export default CreateDonationForm
