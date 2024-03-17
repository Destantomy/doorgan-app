import React, {useState} from 'react';
import {useSignup} from '../../hooks/useSignup';
import {Link} from 'react-router-dom';
import Spinner from '../../../node_modules/react-bootstrap/Spinner'

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading, created} = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(username, email, password);
    };

  return (
    <div className='signup-container'>
        <div className="login-link">
        <h4>Welcome back !</h4>
          <Link to='/login' className="link-login">Login</Link>
        </div>
        <form className='signup-menu' onSubmit={handleSubmit}>
          <h1 className='signup-header'>Signup</h1>
          <input type="text" className='signup-form form-control' id='exampleInputEmail1' autoFocus placeholder='Username' maxLength={7} onChange={(e) => setUsername(e.target.value)} value={username} />
          <input type="email" className='signup-form form-control' id='exampleInputEmail1' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" className='signup-form form-control' id='exampleInputEmail1' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
          {!isLoading && <button className='signup-form btn btn-danger'>Signup</button>}
          {isLoading && <button className='signup-form btn btn-danger' disabled><Spinner variant='light'/></button>}
          {created && <div className="alert alert-success" role="alert">{created}</div>}
          {error && <div className="error-auth error alert alert-danger" role="alert">{error}</div>}
        </form>
    </div>
  )
}

export default Signup
