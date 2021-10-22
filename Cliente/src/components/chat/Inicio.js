import Chat from './Chat';
import './Chat.css';
import SignIn from './SignIn';
import { auth } from '../../Firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'

function Inicio() {
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? <Chat /> : <SignIn />}
    </>
  );
}

export default Inicio;