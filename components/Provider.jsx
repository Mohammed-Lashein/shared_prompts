'use client'
/* It is important to declare that this component is use client , because the SessionProvider uses react useContext hook under the hood (This is stated in nextAuth docs) */
import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
export default Provider
