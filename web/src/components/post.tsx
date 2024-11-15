import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { formatDistance, format } from "date-fns"
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
		return formatDistance(new Date(postedAt), new Date(), { addSuffix: true, locale: ptBR })
	}

	async function handleLikePost() {
		const response = await axios.get(`http://localhost:3000/posts/like/${id}`)
		const likesQuantity = response.data.post.likes

		setLikesQuantity(likesQuantity)
	}

	return (
		<div className="py-4 border px-4 rounded-xl hover:bg-white/5 transition-colors]">
			<header className="flex items-center gap-2">
				<Avatar>
					<AvatarImage width={46} className="rounded-full" src="https://github.com/luizfranzon.png" alt="Avatar" />
					<AvatarFallback>LF</AvatarFallback>
				</Avatar>
				<div className="w-full">
					<h2 className="font-bold flex justify-between w-full">
						<div className="flex gap-1 items-center">
							Luiz Franzon
							<span>·</span>
							<span title={format(postedAt, "dd/MM/yyyy 'at' hh:mm")} className="font-normal text-sm">
								{timeDistance()}.
							</span>
						</div>
						<button onClick={() => handleLikePost()} className="font-normal flex items-center gap-1 text-sm p-2 rounded-xl">
							<Heart color={likesQuantity > 0 ? '#f91880' : "white"} weight={likesQuantity > 0 ? 'fill' : 'regular'} size={18} />
							<span>{likesQuantity}</span>
						</button>
					</h2>
					<div>
						<p className="italic -mt-2">@luizfranzon</p>
					</div>
				</div>
			</header>
			<main className="mt-3">
				<p>{content}</p>
			</main>
		</div>
	)
}