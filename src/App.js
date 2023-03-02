import { useState, useRef } from 'react';
import './App.css';
import Auth from './components/Auth';
import Chat from './components/Chat';

import { auth } from './firebase-config';
import { signOut } from 'firebase/auth';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function App() {
  //checking if user is auth, return true or false
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  //checkin existing chat
  const [room, setRoom] = useState(null);
  //get input reference
  const inputRoomRef = useRef(null);

  async function signUserOut(){
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return <div><Auth setIsAuth={setIsAuth}/></div>
  }
  return (
    <>
      {room ?
        <Chat room={room} setRoom={setRoom}/> :
        <div className="createRoom">
          <div className='chat-logo'></div>
            <h3 className='createRoom-name'>{auth.currentUser.displayName}</h3>
            <p className='createRoom-text'>CREATE YOUR ROOM</p>
          <input  
          autoFocus 
          type="text" 
          ref={inputRoomRef}
          className="createRoom-room"
          placeholder='create room...'
          />
          <button 
          onClick={() => setRoom(inputRoomRef.current.value)} 
          className="createRoom-button"
          >
            Enter The Chat
          </button>
          <div className='sign-out'>
            <button onClick={signUserOut}>Sign Out</button>
          </div>
        </div>}
    </>
  )
}

export default App;
