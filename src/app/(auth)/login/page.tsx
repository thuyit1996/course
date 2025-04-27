const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">

        {/* Main container */}
        <div className="flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
  
          {/* Left image */}
          <div className="md:w-1/2 p-4 md:p-6 flex justify-center w-full relative" data-aos="zoom-in">
          <div className="bg-[$ffe4e8]">
            <img
              src={`/images/auth/image.png`}
              alt="Girl with notebooks"
              className="w-full h-full object-cover"
            />
          </div>

          </div>
  
          {/* Right form */}
          <div className="md:w-1/2 w-full p-8 flex flex-col justify-center" data-aos="fade-left">
            
            {/* Logo */}
            <div className="mb-6 text-center md:text-left" data-aos="fade-down">
              <img
                src="https://via.placeholder.com/150x40?text=MS.LAN+ENGLISH"
                alt="Logo"
                className="h-10 mx-auto md:mx-0 mb-4"
              />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Welcome to<br />
                <span className="text-gray-900 dark:text-white">Your Workspace ✨</span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                Log in to start fresh or pick up where you left off.
              </p>
            </div>
  
            {/* Form */}
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">Email</label>
                <input
                  type="email"
                  required
                  placeholder="@example.com"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
                />
                <div className="text-right mt-2">
                  <a href="#" className="text-xs text-primary hover:underline">Forgot Password?</a>
                </div>
              </div>
  
              <button
                type="submit"
                className="w-full bg-primary hover:bg-pink-500 text-white font-semibold py-2 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                Log In
              </button>
  
            </form>
  
            {/* Footer */}
            <div className="text-center mt-4 text-sm" data-aos="fade">
              <span className="text-gray-700 dark:text-gray-300">Don't have an account?</span>
              <a href="#" className="text-primary hover:underline"> Sign Up</a>
            </div>
  
          </div>
  
        </div>
  
      </div>
    )
}
export default LoginPage;