import { BrowserRouter, Route, Routes } from 'react-router'
import CommissionerLayout from './Layouts/CommissionerLayout'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/commissioner' element={<CommissionerLayout></CommissionerLayout>}>
            <Route index element={<h1>Admin Route.</h1>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
