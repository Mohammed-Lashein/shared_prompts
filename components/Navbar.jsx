'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'

const Navbar = () => {
	const {data: session} = useSession()
	// console.log('##This is the output of useSession from navbar file');
	// console.log(useSession());
	// console.log('##END of useSession hook##');
	/* After logging what the useSession() hook returns, it made things much clearer : 
		{
			data: {
				expires: 'date of expiration',
				user: {
					email: 'userEmail',
					image: 'string specifiying the image destination',
					name: 'username from the provider'
				}
			}
		}
	*/
	const [providers, setProviders] = useState(null)
	const [toggleDropDown, setToggleDropDown] = useState(false)

	
	useEffect(() => {
		const settingProviders = async () => {
			const response = await getProviders();
			/* The above function (getProviders) will return to us the providers we configured in the special nextauth folder that we created .  */
			setProviders(response)
		}
		settingProviders()
	}, [])

	return (
		<nav className='flex items-center justify-between w-full mt-3 mb-16'>
			<Link href='/'>
				<Image
					src='/assets/images/logo.svg'
					alt='logo'
					width={37}
					height={37}
					className='object-contain'
					/* What is the need of object-contain ?
        >> It preserves the aspect ratio of the img on window resizing */
				/>
				<p className='logo_text'>Promptopia</p>
			</Link>
			{/* Desktop navigation */}
			<div className='hidden sm:flex'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link
							href='/create-prompt'
							className='black_btn'
						>
							Create Post
						</Link>

						<button
							className='outline_btn'
							onClick={signOut}
						>
							Sign out
						</button>
						<Link href='/profile'>
						<Image
							src={session?.user.image}
							alt='user image'
							width={37}
							height={37}
							className='rounded-full cursor-pointer'
						/>
						</Link>
					</div>
				) : 
				<>
				{providers && Object.values(providers).map((provider) => (
					<button
						key={provider.name}
						onClick={() => signIn(provider.id)}
						className='black_btn'
						>
							{/* From the docs, if we passed the provider id to the signIn fn as an argument, it will take us directly to the sign in page of that provider instead of the general signin page . 
							for example: Here in our code I used google provider . On removing the argument that has the id, when I try to sign in I see the page of nextauth showing sign in with google, then when I click on it I go to goole sign in page that contains my email . While when I provide the id, I directly go to the page that contains the sign in with my email shown . 
							
							Also try removing that argument to see the difference . */}
							Sign in
					</button>
				))}
				</>
				}
			</div>

			{/* Mobile navigation */}
			<div className='relative flex sm:hidden'>
				{session?.user ? (
					<div className='flex'>
						<Image
							src={session?.user.image}
							alt='user profile image'
							width={37}
							height={37}
							onClick={() => setToggleDropDown((prev) => !prev)}
							className='rounded-full cursor-pointer'
							/>
							
							{toggleDropDown && <div className='dropdown'>
							<Link href='/profile' className='dropdown_link'>
								My Profile
							</Link>
							<Link href='/create-prompt' className='dropdown_link'>
								Create Prompt
							</Link>
						</div>}
					</div>
					
				) : (
					<>
					{providers && Object.values(providers).map((provider) => (
						<button
							key={provider.name}
							onClick={() => signIn(provider.id)}
							className='black_btn'>
							Sign in
						</button>
					))}
					</>
				)}
			</div>
		</nav>
	)
}
export default Navbar
