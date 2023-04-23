import React from 'react'
import { auth, provider } from './firebase'
import { getAuth, signInWithPopup } from 'firebase/auth'
import './Login.css'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

const Login = () => {
  const [{ }, dispatch] = useStateValue();

  const auth = getAuth();
  const signIn = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message))
  }
  return (
    <div className='login'>
      <div className="login_container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsApp_logo" />
        <div className="login_text">
          <h1>Sign in to WhatsApp </h1>
        </div>
        <button onClick={signIn}>
          Sign In with Google
        </button>
      </div>
    </div>
  )
};

export default Login