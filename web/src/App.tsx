import { useEffect, useState } from "react";
import Post from "./components/post";
import axios from "axios"

interface Posts {
  id: string
  content: string
  likes: number,
  createdAt: Date,
  updatedAt: Date
  deletedAt?: Date
}

interface PostsResponse {
  quantity: number,
  posts: Posts[]
}

export function App() {

  const [posts, setPosts] = useState<Posts[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function getPosts() {
    const respose = await axios.get<PostsResponse>("http://localhost:3000/posts")
    const posts = respose.data.posts
    setPosts(posts)
  }

  useEffect(() => {
    getPosts().then(() => setIsLoading(false))
  }, [])

  return (
    <>
      <header className="flex items-center justify-center py-8 border-b">
        <h1 className="font-bold">Luiz Franzon's Mind Feed 🧠</h1>
      </header>
      {
        !isLoading ? (
          <div>
            <div className="flex h-full rounded-xl p-4 flex-col gap-4 max-w-screen-sm m-auto border-[#2f3336] mb-4">
              {
                posts.map((post) => (
                  <Post
                    key={post.id}
                    id={post.id}
                    content={post.content}
                    postedAt={post.createdAt}
                    likeCount={post.likes}
                  />
                ))
              }
            </div>
            <div className="flex items-center justify-center mb-14">
              <span className="font-bold italic">Fim...</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full mt-6">
            <span className="font-bold">Carregando...</span>
          </div>
        )
      }
    </>
  )
}