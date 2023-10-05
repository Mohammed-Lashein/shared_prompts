'use client'
import { useSession } from 'next-auth/react'
import  Image  from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
const PromptCard = ({ post, handleEdit, handleDelete }) => {
	const [copied, setCopied] = useState('')
	const pathName = usePathname()
	const { data: session } = useSession()
	const handleTextCopy = () => {
		setCopied(post.prompt)
		// navigator.clipboard.writeText(copied)
		/* The above code didn't work on copying and pasting, maybe because we were accessing the value of copied after updating it but we were in the same place of update, so the update haven't taken place yet . Also, I found in the source code that the instructor used in the writeText method post.prompt and not copied . */
		navigator.clipboard.writeText(post.prompt)
		setTimeout(() => setCopied(''), 3000)
		/* Explanation of navigator.clipboard : This is a web API which is native js (I thought it was from nextjs but actually it is not) and it allows us to deal with the clipboard (read and write) present on the system of the user device .  */

		/* A very technical note regarding the functionality of this fn : 
		I tried to paste multiple times in the input above the prompt but in vain . This is because we were not causing a re-render . If you returned to the feed component that contains the input, we wrote a fn that deals with onChange but it was an empty one, so nothing appeared on the screen . 
		I also didn't recognize until I replayed the video  that the instructor pasted the text in the searchbar and not in the input field .   */
	}
	return (
		<div className='prompt_card'>
			<div className='flex items-start justify-between gap-5'>
				{/* This div is the container of the copy img and the user info . 
        
        The div we will create below is the one that will contain the uesr info (which we want to also be a flex container)*/}
				<div className='flex items-center gap-3'>
					<Image
						width={40}
						height={40}
						src={post.createdBy?.image}
						alt='user photo'
					/>
					<div className='flex flex-col'>
						<h3 className='font-semibold text-gray-900 font-satoshi'>{post?.createdBy?.username}</h3>
						<p className='text-gray-500'>{post?.createdBy?.email}</p>
					</div>
				</div>
				<div className='copy_btn'>
					<Image
						src={copied === '' ? '/assets/icons/copy.svg' : '/assets/icons/tick.svg'}
						alt='copy / tick img'
						onClick={handleTextCopy}
						width={12}
						height={12}
					/>
				</div>
			</div>
			<p className='my-4 text-sm text-gray-700 font-satoshi'>{post.prompt}</p>
			<p className='cursor-pointer font-inter blue_gradient'>
				{/* We should write the funcitonality of the tag click in the profile component but use it here.  */}
				{post.tag}
			</p>
			{session?.user.id === post.createdBy?._id && pathName === '/profile' ? (
				<div className='gap-4 pt-3 mt-5 border-t border-gray-100 flex-center'>
					<p
						className='cursor-pointer font-inter green_gradient'
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className='cursor-pointer font-inter orange_gradient'
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}
export default PromptCard
