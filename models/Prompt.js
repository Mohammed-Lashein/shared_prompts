import { models, model, Schema } from 'mongoose'

const PromptSchema = new Schema({
	createdBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		/* This object requires a bit of explanation so I will do my best . (Also try logging the created prompt with and without the ref (delete it and add it again) so that you can understand what is happening ) 
    
    This code will make each prompt refer to the user created it, so that in the prompt object stored in the db, we will have all the information that is stored in the db regarding the user who created that prompt . 
    
    If we removed the ref from here, we will just get the id of the user created that prompt but without the additional information . 
    
    Question) Why do we need to do that ?
    >> Further in the application, we will need to get the properties of the user who created the prompt (And I will write here the file names in which we will use these needed properties)*/
	},
	prompt: {
		type: String,
		required: [true, 'Prompt is required'],
	},
	tag: {
		type: String,
		required: [true, 'Tag is required'],
	},
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
