import mongoose from 'mongoose'

let isConnected = false;

const connectToDB = async () => {
  mongoose.set('strictQuery', true)
  /* This is the first time I see the above line of code, so I asked  AI, and it provided me with a good explanation: 
  By default , mongoose ignores any fields in the query that are not defined in the schema . on setting strictQuery to true, it will throw an error if the user attempts to search for a query that is not present in the schema . */

  if (isConnected) {
    console.log('Connected to DB');
    return;
    // The need of this condition is that there is no need to reconnect to the DB when we're already connected . Below we will change the value of this variable to true , and if it's value is still true, then there is no need to reconnect to the DB . 
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'shared-prompts',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to DB');

  } catch (error) {
    console.log(error);
  }
}
export default connectToDB