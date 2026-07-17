
import Header from '../components/Header';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Simplify Construction Project Updates
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              OnSite connects engineers and clients with real-time updates, milestone tracking, and transparent communication.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/signup"
                className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg border border-indigo-600 hover:bg-indigo-50 transition"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Your Project</h3>
                <p className="text-gray-600">Engineers can easily create and manage construction projects.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Daily Updates</h3>
                <p className="text-gray-600">Post text updates and progress images to keep clients informed.</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-indigo-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Connected</h3>
                <p className="text-gray-600">Clients can view updates, track milestones, and chat with engineers.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Landing;

