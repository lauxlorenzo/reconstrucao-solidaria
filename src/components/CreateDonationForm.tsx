import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Paperclip, FileImage } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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



const MAX_FILE_SIZE = 1024 * 1024 * 5;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_IMAGE_TYPES = ["jpeg", "jpg", "png", "webp"];

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
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Tamanho máximo de 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Apenas .jpg, .jpeg, .png e .webp"
    ),
})

const CreateDonationForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // 1. Define your form.
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

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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

        <div className={`flex col-span-4 p-4 rounded border border-input items-center justify-center`} >
          <div className={`flex h-[fit-content]`}>
            {selectedImage ? (
              <div className="md:max-w-[90px]">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="p-3 flex justify-center items-center">
                  <FileImage size={56} color="#64748B" />
                </div>
              </div>
            )}
          </div>
        </div>

        <FormField
          control={form.control}
          name="adImage"
          render={({ field }) => (
            <FormItem className="col-span-4">
              <FormControl>
                <Button size="lg" type="button">
                  <input
                    type="file"
                    className="hidden"
                    id="fileInput"
                    accept="image/*"
                    onBlur={field.onBlur}
                    name={field.name}
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setSelectedImage(e.target.files?.[0] || null);
                    }}
                    ref={field.ref}
                  />
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-500 hover:bg-blue-600 text-neutral-90  rounded-md cursor-pointer inline-flex items-center"
                  >
                    <Paperclip />
                    <span className="whitespace-nowrap ml-2">
                      Escolha suas imagens
                    </span>
                  </label>
                </Button>
              </FormControl>
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
