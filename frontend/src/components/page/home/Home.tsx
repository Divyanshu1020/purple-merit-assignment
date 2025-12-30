export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-6">
            Welcome to Purple Merit
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive user management platform
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/login"
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
            >
              Get Started
            </a>
            <a
              href="/signup"
              className="px-8 py-3 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium text-lg"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
