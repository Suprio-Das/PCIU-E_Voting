import { BrowserRouter, Route, Routes } from 'react-router'
import CommissionerLayout from './Layouts/CommissionerLayout'
import StudentLayout from './Layouts/StudentLayout'
import MainLayout from './Layouts/MainLayout'
import Login from './Components/login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout></MainLayout>}>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/commissioner' element={<CommissionerLayout></CommissionerLayout>}>
              <Route index element={<h1>Admin Route.</h1>}></Route>
            </Route>
            <Route path='/student' element={<StudentLayout></StudentLayout>}>
              <Route index element={<h1>Student Route.</h1>}></Route>
            </Route>
            {/* <Route path='/login' element={<Login></Login>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
