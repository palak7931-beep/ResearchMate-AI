const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-blue-400 font-semibold mb-4">
        AI Powered Research Workspace
      </p>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        Research Smarter
        <br />
        <span className="text-blue-500">Not Harder.</span>
      </h1>

      <p className="mt-6 max-w-2xl text-gray-400 text-lg">
        Upload research papers, chat with PDFs, generate literature reviews,
        compare papers, and organize your research—all in one place.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold">
          Get Started
        </button>

        <button className="border border-gray-700 hover:border-blue-500 px-6 py-3 rounded-xl">
          Learn More
        </button>
      </div>
    </section>
  );
};

export default Hero;