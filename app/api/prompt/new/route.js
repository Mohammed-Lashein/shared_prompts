import connectToDB from '@/db/connect'
import Prompt from '@/models/Prompt'

export const POST = async (req) => {
  const {prompt,tag,userId} = await req.json()
  console.log(prompt);
  console.log(tag);
  console.log(userId);
  /* Note that this is different from what we were used to in express , where we destructure the req.body . I wasn't sure why we did that here in nextjs so I tried to log req.body, and it provided information that didn't include the data that we're sending to this endpoint from create-prompt page .  */
  try {
    await connectToDB()
    // const newPrompt = await Prompt.create({
    //   prompt, tag, createdBy: userId
    // })
    const newPrompt = new Prompt({
      prompt,
      tag,
      createdBy: userId
    })
    await newPrompt.save()
    /* A small thing to recognise : Here we're not destructuring, we're creating a property named createdBy and giving it the value of the userId .  */
    // await newPrompt.save()
    return new Response(JSON.stringify(newPrompt), {status: 201})
  } catch (error) {
    console.log(error);
    return new Response('Failed to create a new prompt')
  }
}