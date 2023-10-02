import Link from 'next/link'

const Form = ({ type, isSubmitting, handleSubmit, post, setPost }) => {
	return (
		<section className='flex flex-col justify-start w-full max-w-full'>
			<h1 className='head_text blue_gradient'>{type} Post</h1>
			<p className='max-w-md desc'>
				{type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform .
			</p>
			{/* Try removing the max-w-md class from the p tag and see what happens  */}
			<form className='flex flex-col w-full max-w-2xl my-8 glassmorphism gap-7' onSubmit={handleSubmit} >
				<label>
					<span className='text-base font-semibold text-gray-700 font-satoshi'>Your AI Prompt</span>
					<textarea
						className='form_textarea'
						placeholder='Write your post here'
            value={post.prompt}
            onChange={(e) => setPost({...post, prompt: e.target.value})}
					></textarea>
				</label>
				{/* Note that it is important to wrap the span and the textarea or input in the label, so that they're dealt with as one section and the gap of flex would take place then .  */}
				<label>
					<span className='font-semibold text-gray-700 font-base font-satoshi'>
						Tag <span className='font-normal'>(#product, #idea, #webdevelopment, etc...)</span>
					</span>
					<input
						type='text'
						placeholder='#Tag'
						className='form_input'
            value={post.tag}
            onChange={(e) => setPost({...post, tag: e.target.value})}
					/>
				</label>
				<div className='gap-4 mx-3 mb-5 flex-end'>
					<Link
						href='profile'
						className='text-sm text-gray-500'
					>
						Cancel
					</Link>
					{/* Note that above we can use a regular html anchor tag, but the Link component is much better as it doesn't cause a full page reload as the anchor tag does, resulting in a faster and a smoother user experience .  */}
					<button
						type='submit'
						className='px-5 py-1.5 rounded-full bg-primary-orange text-sm text-white'
            disabled={isSubmitting}
					>
						{isSubmitting && type === 'Create'
							? `${type.slice(0, -1)}ing...`
							: isSubmitting && type === 'Edit'
							? type + '...'
							: type}
						{/* I wrote the above code like that due to English grammar . Where we can't add ing to create because we need to remove the last letter from it , while we don't need to remove the last letter in Edit, so this condition deals with that . */}
						{/* A question came to my mind while writing the above condition so that I searched about it: Why in jsx we can use ternary expression and not a regular if statement ? 
            
            >> In javascript , There is a difference between an expression and a statement: 
            
              - Expression: A piece of code that produces a value , eg) 2 + 3
              
              - Statement: A complete instruction or action that performs a specific task . It doesn't produce a value of it's own , eg) let x = 5
              
              Back to our discussion : Ternary operator is an example of conditional expression i.e. it returns a value, so we can use it in jsx, while if conditions are control flow statements used to execute different blocks of code based on a condition  i.e They state something but don't return a value , that's why we can't use if statements in jsx . 
              */}
					</button>
				</div>
			</form>
		</section>
	)
}
export default Form
