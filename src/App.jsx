import { useState } from 'react'

import NavSideBar from './components/NavSideBar'
import { Route, Routes } from 'react-router-dom'
import Overview from './pages/Overview'
import Categories from './pages/Categories'
import Form from './pages/Form'
import AddExpense from './components/AddExpense'
import CreateNewExpense from './components/CreateNewExpense'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path='/home' element={<NavSideBar />}>
          <Route index element={<Overview />}/>
          <Route path='categories' element={<Categories />}/>
          <Route path='expense' element={<Form />}>
            <Route index element={<AddExpense />}/>
            <Route path='create' element={<CreateNewExpense />}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
