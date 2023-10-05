'use client'
import Profile from '@/components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
const ProfileLayout = () => {
  const [posts, setPosts] = useState([])
  const {data: session} = useSession()
  // If you wanna check what the strucure of the returned value from useSession hook is, check the navbar component as I explained that in detail .  
  const router = useRouter()

    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()
      setPosts(data)
    }

    useEffect(() => {
      if (session?.user.id) {
        fetchUserPosts()
        /* What is the need of this if statement ? 
      >> Since we're in the profile page now , we want to check if the user is logged in by checking the session . If the user is logged in , then we can fetch the posts specific to that user using the id in the session (notice that we're using also that id in the endpoint above to fetch the posts from the route file ) */
      }
    }, [])

  const handleEdit = (post) => {
    router.push(`/edit-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt ?')
    if (hasConfirmed) {
       await fetch(`/api/prompt/${post._id.toString()}`, {
        method: 'DELETE'
      })
      // No need to put the fetch result in a variable as we won't use it 
      const filteredPosts = posts.filter((item) => item._id !== post._id)
      setPosts(filteredPosts)
    }
  }
  return <Profile
          type='My'
          desc='Welcome to your personalized profile'
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
    
  
}
export default ProfileLayout