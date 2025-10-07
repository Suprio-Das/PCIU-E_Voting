import { BrowserRouter, Route, Routes } from 'react-router'
import CommissionerLayout from './Layouts/CommissionerLayout'
import StudentLayout from './Layouts/StudentLayout'
import MainLayout from './Layouts/MainLayout'
import Login from './Components/login'
import Commissioner from './Components/Commissioner'
import VoterLogin from './Components/VoterLogin'
import VotingPage from './Components/VotingPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainLayout></MainLayout>}>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/commissioner' element={<CommissionerLayout></CommissionerLayout>}>
              <Route index element={<Commissioner></Commissioner>}></Route>
            </Route>
            <Route path='/student' element={<StudentLayout></StudentLayout>}>
              <Route index element={<VoterLogin></VoterLogin>}></Route>
              <Route path='vote' element={<VotingPage></VotingPage>}></Route>
            </Route>
            {/* <Route path='/login' element={<Login></Login>}></Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
