'use client'
import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ posts, handleTagClick }) => {
	return (
		<div className='mt-16 prompt_layout'>
			{posts.map((post) => (
				<PromptCard
					key={post._id}
					post={post}
					handleTagClick={handleTagClick}
				/>
			))}
		</div>
	)
}

const Feed = () => {
	const [allPosts, setAllPosts] = useState([])
  // search states
	const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])


	const fetchPosts = async () => {
		const response = await fetch('/api/prompt')
		if (!response.ok) {
			throw new Error('An error occurred with the response')
		}
		const data = await response.json()
		setAllPosts(data)
	}

	// useEffect(() => fetchPosts(), [])
  /* The above code caused an error saying that useEffect should not return a function instead of a cleanup . I wrote the above line specifically because I wondered why on function invocations throughout the whole project I invoked them in the arrow function curly braces . That's the reason behind this , in which we don't want the function to return anything but to only run the fetchPosts function (or any function upon page first rendering .) */
	useEffect(() => {
    fetchPosts()
  }, [])

	const filterPrompts = (searchText) => {
		const regex = new RegExp(searchText, 'i')
		
			return allPosts.filter((item) => regex.test(item.createdBy.username) || regex.test(item.prompt) || regex.test(item.tag))
      /* So, this function will return to us an array that will contain the elements matching our pattern (i.e. user input .) */
	}

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    // The setSearchText is used so that the text we're writing in the input appears on the screen , in other words, we want to cause a re-render . 

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = filterPrompts(e.target.value)
        setSearchedResults(searchResults)
      }, 500)
    )
    /* Explanation of this function body: 
    The setTimeout above won't implement unless it waits 500ms . What is the need of that ? 
    >> Since the handleSearchChange function will work on every change in the input (i.e. when the user types) then we don't want to filter prompts until the user finishes typing , thus decreasing the amount of unnecessary computation to be done . So every time the user writes in the input field, we're clearing the setTimeout so that it doesn't take place . 
    
    the setTimeout will only take place when the user stops typing. */
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
    /* What will this function do ?
    >> The handleTagClick function first sets the text that will appear in the input field to be the tagName that we will click on . 
    
    Then it filters the prompts to only show the prompts with the corresponding prompts . 
    Finally we change the prompts to be displayed to be only the prompts matching the search . */
    
  }


	return (
    <>
		<section className='feed'>
			<form className='relative w-full flex-center'>
				<input
					type='text'
					placeholder='Search for prompt or a tag'
					className='search_input'
					value={searchText}
					onChange={handleSearchChange}
				/>
			</form>
		</section>
      {/* All prompts */}
      {searchText ? (
        <PromptCardList
        posts={searchedResults}
        handleTagClick={handleTagClick}/>
      ) : (
        <PromptCardList
				posts={allPosts}
				handleTagClick={handleTagClick}
        />
      ) }
      {/* I removed the PromptCardList from the section because the section had a max-width: 36rem which wasn't enough for the prompts to be diplayed in a good way on desktop .  */}
    </>
	)
}
export default Feed
