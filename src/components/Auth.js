import {auth, provider} from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import '../App.css';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Auth(props){
    const {setIsAuth} = props;

    async function SignInWithGoogle(){
        try {
        const access = await signInWithPopup(auth, provider);
        cookies.set("auth-token", access.user.refreshToken);
        //for rerendering component in App.js
        setIsAuth(true);
        } catch(error){
            console.error(error);
        }
    }

    return(
        <div className="auth">
            <div className='chat-logo'></div>
            <p>Login</p>
            <p>Use your Google Account</p>
            <div className='auth-line'></div>
            <div className='auth-button' onClick={SignInWithGoogle}>
                <span>Sign In With Google</span>
            </div>
            <span>Работаете на чужом компьютере? Включите гостевой режим.</span>
        </div>
    )
}
export default Auth;