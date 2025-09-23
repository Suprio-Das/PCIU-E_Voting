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
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path> </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;