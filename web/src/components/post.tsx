import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { formatDistanceToNow, format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Heart } from "phosphor-react"
import { useState } from "react";
import axios from "axios";

interface PostProps {
	id: string
	content: string;
	postedAt: Date
	likeCount: number
}

export default function Post({ id, content, postedAt, likeCount }: PostProps) {

	const [likesQuantity, setLikesQuantity] = useState(likeCount)

	function timeDistance() {
		return formatDistanceToNow(new Date(postedAt), { addSuffix: false, locale: ptBR })
	}

	async function handleLikePost() {
		const response = await axios.get(`http://192.168.0.17:3000/posts/like/${id}`)
		const likesQuantity = response.data.post.likes

		setLikesQuantity(likesQuantity)
	}

	return (
		<div className="py-4 border px-4 rounded-xl sm:hover:bg-white/5 transition-colors]">
			<header className="flex items-center gap-2">
				<Avatar>
					<AvatarImage width={46} className="rounded-full" src="https://github.com/luizfranzon.png" alt="Avatar" />
					<AvatarFallback>LF</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<h2 className="font-bold flex justify-between w-full">
						<div className="flex gap-1 items-center">
							<div className="flex gap-1 items-center">
								Luiz Franzon
								<span className="sm:block hidden">·</span>
							</div>
							<span title={format(postedAt, "dd/MM/yyyy 'at' hh:mm")} className="font-normal text-sm sm:block hidden">
								{timeDistance()}.
							</span>
						</div>
						<button onClick={() => handleLikePost()} className="font-normal flex items-center gap-1 text-sm p-2 rounded-xl">
							<Heart color={likesQuantity > 0 ? '#f91880' : "white"} weight={likesQuantity > 0 ? 'fill' : 'regular'} size={18} />
							<span>{likesQuantity}</span>
						</button>
					</h2>
					<div>
						<p className="italic -mt-2">@luiz</p>
					</div>
				</div>
			</header>
			<main className="mt-6">
				<p>{content}</p>
			</main>
		</div>
	)
}