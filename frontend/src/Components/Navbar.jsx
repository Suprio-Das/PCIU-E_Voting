import Logo from '../../public/Logo.png'

const Navbar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1 ms-5">
                    <a className='flex items-center gap-2'>
                        <img src={Logo} alt="" className='w-14 h-18' />
                        <div>
                            <h1 className='font-bold text-blue-600 text-xl -mb-2'>PCIU E-Voting</h1>
                            <p className='text-gray-500 text-sm'>Powered By CSE.</p>
                        </div>
                    </a>
                </div>
                <div className="flex-none">
                    <button className="btn bg-blue-600 mr-5 text-white">Login</button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;