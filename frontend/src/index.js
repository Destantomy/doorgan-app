import React from 'react'
import ReactDOM from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App'
import { AuthContextProvider } from './context/authContext'
import { ProductsContextProvider } from './context/productsContext'
import { UsersContextProvider } from './context/usersContext'
// import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ProductsContextProvider>
    <UsersContextProvider>
    <App />
    </UsersContextProvider>
    </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
