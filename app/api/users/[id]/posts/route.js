import connectToDB from '@/db/connect';
import  Prompt  from '@/models/Prompt';

export const GET = async (request, {params}) => {
  try {
    await connectToDB()
    const prompts = await Prompt.find({createdBy: params.id}).populate('createdBy')
    return new Response(JSON.stringify(prompts), {status: 200})
  } catch (error) {
    console.log(error);
    return new Response('Failed to fetch user prompts', {status: 500})
  }
}
