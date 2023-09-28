'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
	const [userLoggedIn, setUserLoggedIn] = useState(true)
	const [showDropDown, setShowDropDown] = useState(false)
	const signOut = () => {}
	const signIn = () => {}

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
				{userLoggedIn ? (
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
						<Image
							src='/assets/images/logo.svg'
							alt='user image'
							width={37}
							height={37}
						/>
					</div>
				) : (
					<button
						className='black_btn'
						onClick={signIn}
					>
						Sign in
					</button>
				)}
			</div>

			{/* Mobile navigation */}
			<div className='relative flex sm:hidden'>
				{userLoggedIn ? (
					<div className='flex'>
						<Image
							src='/assets/images/logo.svg'
							alt='user profile image'
							width={37}
							height={37}
							onClick={() => setShowDropDown((prev) => !prev)}
							className='cursor-pointer'/>
							
							{showDropDown && <div className='dropdown'>
							<Link href='/profile' className='dropdown_link'>
								My Profile
							</Link>
							<Link href='/create-prompt' className='dropdown_link'>
								Create Prompt
							</Link>
						</div>}
					</div>
					
				) : (
					<button
						className='black_btn'
						onClick={signIn}
					>
						Sign in
					</button>
				)}
			</div>
		</nav>
	)
}
export default Navbar
