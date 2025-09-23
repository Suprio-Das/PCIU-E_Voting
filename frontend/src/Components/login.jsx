const Login = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
    }
    return (
        <div className="min-h-[calc(100vh-120px)] flex justify-center items-center">
            <form className="w-[40%] shadow-lg border-1 border-[#2a3793] rounded-xl p-5" onSubmit={handleLogin}>
                <h1 className="lg:text-2xl font-bold primary-color text-center my-3">Login as Commissioner</h1>
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-lg">Email</legend>
                    <input type="email" className="input w-full outline-0 border-1 border-[#2a3793] focus-visible:outline-0 focus-visible:border-2" placeholder="Type Email here" name="email" required />
                </fieldset>
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-lg">Password</legend>
                    <input type="password" className="input w-full outline-0 border-1 border-[#2a3793] focus-visible:outline-0 focus-visible:border-2" placeholder="Type Password here" name="password" required />
                </fieldset>
                <button className="btn bg-[#2a3793] text-white w-full my-3">Login</button>
            </form>
        </div>
    );
};

export default Login;