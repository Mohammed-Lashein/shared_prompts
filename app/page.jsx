import Feed from '@/components/Feed'
import './globals.css'
/* Note that it is highly recommended to use globals.css only in the main page file, and any other component should use *.module.css to avoid classes conflicts .  */

const Home  = () => {
  return (
   <section className='flex flex-col justify-center items-center w-full'>
    <p className='head_text text-center'>Discover & Share</p> 
    <p className='orange_gradient head_text text-center'>AI-Powered Prompts</p>
    <p className='desc text-center'>
    Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts .
    </p>
    <Feed/>
   </section>
  )
}
export default Home 