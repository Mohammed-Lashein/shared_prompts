import connectToDB from '@/db/connect'
import Prompt from '@/models/Prompt'

export const GET = async (request, { params }) => {
	try {
		await connectToDB()
		const specificPost = await Prompt.findById(params.id).populate('createdBy')
		if (!specificPost) {
			return new Response("Couldn't find a prompt with the provided id", { status: 404 })
		}
		return new Response(JSON.stringify(specificPost), { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response("Couldn't fetch the data of the post to edit", { status: 500 })
	}
}

export const PATCH = async (request, { params }) => {
	const { prompt, tag } = await request.json()
  // forgetting to await the result from the line above will spin your head for more than 30 mins trying to figure out why the prompt is not updating , so don't you ever forget it ! 
	console.log(prompt)
	console.log(tag)
	try {
		await connectToDB()
		const existingPromptInDB = await Prompt.findById(params.id)
		if (!existingPromptInDB) {
			return new Response('No document found with that id', { status: 404 })
		}
		existingPromptInDB.prompt = prompt
		existingPromptInDB.tag = tag
		console.log('##This is the new prompt after update##')
		console.log(existingPromptInDB)
		existingPromptInDB.save()

		return new Response(JSON.stringify(existingPromptInDB), { status: 200 })
	} catch (error) {
		console.log(error)
		return new Response('An error occured while trying to update the prompt', { status: 304 })
		// 304 >> Not modified
	}
}

export const DELETE = async (request, { params }) => {
	try {
		await Prompt.findByIdAndDelete(params.id)
		/* After reading in the docs - also I saw it in vscode suggestions - there are two methods that appeared to do the same functionality : findByIdAndDelete and findByIdAndRemove 
    
    After asking poe if they had any differences, I got an answer that both of them do the same functionality, but there is a historical reason about that . 
    
    The old versions of mongoose had findByIdAndRemove, but it was confusing for developers because it conveyed that the document would be deleted from the DB, which didn't happen but mongoose just labels that document as {deleted :true} . So in mongoose v.4 , findByIdAndDelete was added (with the same functionality) so that the name conveys a more appropriate meaning . */

		return new Response('Document deleted successfully', { status: 200 })
		/* I used the status code here to be 200 instead of 204 because after searching the internet I found that status code of 204 should not have a response body and should just convey that the process was successfully completed by the server .  */
	} catch (error) {
		console.log(error)
		return new Response('Failed to delete the document', { status: 500 })
	}
}
