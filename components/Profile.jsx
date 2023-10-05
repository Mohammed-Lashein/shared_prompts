import PromptCard from './PromptCard'

const Profile = ({type, desc, handleEdit, handleDelete, data}) => {
  
  return (
    <section className='w-full'>
      <h1 className='head_text blue_gradient'>{type} Profile</h1>
      <p className='desc'>{desc}</p>
      <div className='prompt_layout'>
        {/* {console.log(data)} */}
        {data.map((post) => (
          <PromptCard
            key={post._id}
            // I removed the above line to check if React will complain , which will happen probably 
            // Update: Yes I got the error that states that each child should have a key prop 
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
            // What we did in the above two passed functions is that we pass a callback function that will only apply if that function already exists, and if so, then we pass to it the post as an argument so that we can access it with our fn . 
            
          />
        ))}
      </div>
    </section>
  )
}
export default Profile