import React from 'react'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import {Route, Routes} from 'react-router-dom'
import Forgotpassword from './pages/forgotPassword'

function App() {
  return (
    <Routes>
      <Route path='/signup' element = {<Signup/>} />
      <Route path='/signin' element = {<Signin/>} />
      <Route path='/forgotpassword' element = {<Forgotpassword/>} />
    </Routes>
  )
}

export const serverUrl = "http://localhost:3000" //this is the url of our backend file
export default App
