import Navbar from '@/components/Navbar';
import Provider from '@/components/Provider';
export const metadata = {
	title: 'Promptopia',
	description: 'Discover and share AI prompts',
};

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          
      <div className='main'>
						<div className='gradient'></div>
            {/* Note : At first, I wondered what is the use of the above div with gradient class, and after looking carefully, I found that it is the background of our website. */}
					</div>
					<main className='app'>
            <Navbar/>
						{children}
					</main>
          </Provider>
      </body>
    </html>
  )
}
export default RootLayout