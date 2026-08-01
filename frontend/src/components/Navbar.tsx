const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-bold">ResearchOS AI</h1>

        <div className="flex items-center gap-8">
          <a href="#" className="hover:text-blue-400">Features</a>
          <a href="#" className="hover:text-blue-400">About</a>
          <a href="/login" className="hover:text-blue-400">Login</a>

          <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-xl">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;