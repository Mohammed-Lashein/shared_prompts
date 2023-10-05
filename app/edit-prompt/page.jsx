'use client'
import Form from '@/components/Form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'


const EditPrompt = () => {
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [post, setPost] = useState({ prompt: '', tag: '' })
  const promptToUpdateId = useSearchParams().get('id')
  const router = useRouter()

  const fetchCurrentPostData = async () => {
    const response = await fetch(`/api/prompt/${promptToUpdateId}`)
    const data = await response.json()
    setPost({prompt: data.prompt, tag: data.tag})
  }

  useEffect(() => {
    if (promptToUpdateId) {
      fetchCurrentPostData()
    }
  }, [promptToUpdateId])

	const updatePrompt = async (e) => {
    e.preventDefault()
    // The above code will prevent the default behavior of the form which is refreshing the page , as we don't want that to happen because we will send the data to the server then we will redirect the user by ourselves.
    setIsSubmitting(true)
    if (!promptToUpdateId) return alert('Prompt id is missing !')
    try {
      const response = await fetch(`/api/prompt/${promptToUpdateId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.push('/profile')
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
    }
  }


	return (
		<Form
			type='Edit'
			isSubmitting={isSubmitting}
			handleSubmit={updatePrompt}
			post={post}
			setPost={setPost}
		/>
	)
}
export default EditPrompt
