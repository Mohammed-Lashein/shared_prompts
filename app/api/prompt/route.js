import  connectToDB  from '@/db/connect';
import Prompt from '@/models/Prompt';

export const GET = async () => {
  try {
    await connectToDB()
    const posts = await Prompt.find({}).populate('createdBy')
    /* The importance of the populate method : It will allow us to access all the properties of the user of id passed as a value to the createdBy property .  */
  if (!posts) {
    return new Response('No prompts found . Create a new one !', {status: 404})
  }
  return new Response(JSON.stringify(posts), {status: 200})
  } catch (error) {
    console.log(error);
    return new Response('An error occurred while fetching feed posts', {status: 500})
  }
}
