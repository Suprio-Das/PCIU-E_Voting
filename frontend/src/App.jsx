import { BrowserRouter, Route, Routes } from 'react-router'
import CommissionerLayout from './Layouts/CommissionerLayout'
import StudentLayout from './Layouts/StudentLayout'
import MainLayout from './Layouts/MainLayout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout></MainLayout>}>
            <Route path='/commissioner' element={<CommissionerLayout></CommissionerLayout>}>
              <Route index element={<h1>Admin Route.</h1>}></Route>
            </Route>
            <Route path='/student' element={<StudentLayout></StudentLayout>}>
              <Route index element={<h1>Student Route.</h1>}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
