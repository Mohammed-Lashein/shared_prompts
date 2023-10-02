import connectToDB from '@/db/connect';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google'
export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callback: {
    async session({session}) {
      console.log('###This is the session value coming from session callback fn in the options file ');
      console.log(session);
      console.log('##END of SESSION##');

     const sessionUser = await User.findOne({email: session.user.email})
     session.user.id = sessionUser._id.toString()
    //  What is the need of the above line of code ?
    // It simply checks if the user in this session is found in the DB, and if so , modify the id of the user object in the session to the id got from the db of the online user now (In other words, we want to track the online user so that we're getting his id to make sure that he is the one of this account ).
    return session
    },
    async signIn({profile}) {
      console.log('##This is the profile coming from the signIn callback in the options file');
      console.log(profile);
      console.log('##END of PROFILE##');


      try {
        await connectToDB()
         // check if the user already exists
      const userExists = await User.findOne({email: profile.email})

      // if not, create a new user 
      if (!userExists) {
        const newUser = await User.create({
          username: profile.name.replace(' ', '').toLowerCase(),
          email: profile.email,
          image: profile.picture
        })
      }

      // If logged successfully , return true
      return true
      } catch (error) {
        console.log(error);
        return false
      }
    }
  }
}
export default options