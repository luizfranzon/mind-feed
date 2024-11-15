import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";

import { useNavigate } from "react-router-dom"

export function CreatePostPage() {

  const navigate = useNavigate()

  const [postContent, setPostContent] = useState('')
  const [password, setPassword] = useState('')

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = {
      content: postContent,
      password
    }

    const response = await axios.post('http://192.168.0.17:3000/posts', formData)

    if (response.data.message === 'Invalid password') {
      setPassword('')
      alert('Senha inválida')
      return
    }

    setPostContent('')
    setPassword('')
    navigate('/')
  }

  return (
    <div className="w-full h-screen flex items-center justify-center px-2">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-6 sm:border rounded-xl p-6 items-center justify-center w-full max-w-96 m-auto"
      >
        <div className="w-full flex">
          <h2 className="font-bold">Novo post</h2>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="content">Conteúdo:</Label>
          <Textarea rows={5} value={postContent} onChange={({ target }) => setPostContent(target.value)} />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="password">Senha:</Label>
          <Input value={password} onChange={({ target }) => setPassword(target.value)} type="password" name="password" />
        </div>
        <div className="w-full">
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  )
}