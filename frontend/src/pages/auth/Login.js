import React, {useState} from 'react';
import {useLogin} from '../../hooks/useLogin';
import {Link} from 'react-router-dom';
import Spinner from '../../../node_modules/react-bootstrap/Spinner'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login-container">
        <form className='login-menu' onSubmit={handleSubmit}>
          <h1 className='login-header'>Login to your account</h1>
          <input type="email" className='login-form form-control' id='exampleInputEmail1' autoFocus placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" className='login-form form-control' id='exampleInputEmail1' placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password} />
          {!isLoading && <button className='login-form btn btn-danger'>Login</button>}
          {isLoading && <button className='login-form btn btn-danger' disabled><Spinner variant='light'/></button>}
          {error && <div className="error-auth error alert alert-danger" role="alert">{error}</div>}
        </form>
        <div className="signup-link">
          <h4>Don't have account ?</h4>
          <Link to='/signup' className="link-signup">Signup here</Link>
        </div>
    </div>
  )
}

export default Login
