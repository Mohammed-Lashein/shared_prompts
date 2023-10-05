'use client'
import Form from '@/components/Form'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
/* Note : I searched on the use of the @ symbol (whose configuration is in the jsconfig.json file) ,and I found that it allows us to access file and folders relative to the root dir even if we're not in the root dir (as we're here) . It is helpful because we won't then need to write bunch of ../   */
const CreatePrompt =  () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const {data: session} =  useSession()
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  const router = useRouter()
  const createPrompt = async (e) => {
    e.preventDefault()
    // This function will be invoked on form submission in the form component . So it is important to prevent the default behavior of the form submission which is refreshing the page. 
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        /* Note that not stringifying the data sent in the body will cause an error and the new prompt won't be created .  */
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        })
      })
      if (response.ok) {
        // console.log('##This is the response returned from creating a new prompt##');
        // console.log(response);
        // console.log('##This is the ok value of the response returned from creating a new prompt ##');
        // console.log(response.ok);

        /* After logging it, response.ok returns a boolean value either true or false .  */
        router.push('/profile')

      }
    } catch (error) {
      console.log('before the error');
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }

  return <Form 
            type='Create'
            isSubmitting={isSubmitting}
            handleSubmit= {createPrompt}
            post={post}
            setPost={setPost}
            />
}
export default CreatePrompt