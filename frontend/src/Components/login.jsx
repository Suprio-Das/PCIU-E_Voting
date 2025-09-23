const Login = () => {
    return (
        <div className="min-h-[calc(100vh-120px)] flex justify-center items-center">
            <form className="w-[40%] border-1 p-5">
                <h1 className="lg:text-2xl font-bold text-blue-600 text-center my-3">Login as Commissioner</h1>
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-lg">Email:</legend>
                    <input type="text" className="input w-full" placeholder="Type here" />
                </fieldset>
                <fieldset className="fieldset w-full">
                    <legend className="fieldset-legend text-lg">Password:</legend>
                    <input type="text" className="input w-full" placeholder="Type here" />
                </fieldset>
            </form>
        </div>
    );
};

export default Login;