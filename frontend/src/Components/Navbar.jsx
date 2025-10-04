import { useSelector } from 'react-redux';
import Logo from '../../public/Logo.png'
import api from '../Services/api';
import { Link } from 'react-router';

const Navbar = () => {
    const user = useSelector((state) => state.Auth.user)
    // Handling Logout
    const handleLogout = async () => {
        const res = await api.post('/api/auth/logout')
        console.log(res)
    }
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1 ms-5">
                    <a className='flex items-center gap-2'>
                        <img src={Logo} alt="" className='w-14 h-18' />
                        <div>
                            <h1 className='font-bold primary-color text-xl -mb-1'>PCIU E-Voting</h1>
                            <p className='text-gray-500 text-sm'>Powered By CSE.</p>
                        </div>
                    </a>
                </div>
                <div className="flex-none">
                    {/* <button className="btn bg-[#2a3793] mr-5 text-white">{user ? 'Logout' : 'Login'}</button> */}
                    {user ? <button onClick={handleLogout} className="btn bg-[#2a3793] mr-5 text-white">Logout</button> : <Link to="/" className="btn bg-[#2a3793] mr-5 text-white">Login</Link>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;