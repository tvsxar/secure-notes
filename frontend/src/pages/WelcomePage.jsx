function WelcomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome to Notedly!
        </h1>

        <p className="text-gray-600 mb-8">
          Keep your thoughts private and accessible anywhere.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/account?mode=login"
            className="px-5 py-2 bg-black text-white rounded-lg font-medium hover:bg-black/80 transition active:scale-[0.98]">
            Sign In
          </a>
          <a
            href="/account?mode=register"
            className="px-5 py-2 border border-black text-black rounded-lg font-medium hover:bg-black/10 transition active:scale-[0.98]">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;