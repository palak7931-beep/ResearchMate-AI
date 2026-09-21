import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Temporary login navigation
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#030712] text-white flex items-center justify-center">
      <div className="bg-[#111827] p-8 rounded-2xl border border-gray-800 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login to ResearchOS AI
        </h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 border border-gray-700"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 border border-gray-700"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center text-gray-400 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-400 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;