import { Link } from 'react-router-dom';
import { Box, CheckCircle, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';

const features = [
  {
    name: 'Real-time Tracking',
    description: 'Track every asset in real-time with detailed status updates and location information.',
    icon: Box,
  },
  {
    name: 'Secure Management',
    description: 'Role-based access control ensures your inventory data stays secure and accessible only to authorized personnel.',
    icon: Shield,
  },
  {
    name: 'Efficient Borrowing',
    description: 'Streamlined borrowing process with automated notifications and return tracking.',
    icon: CheckCircle,
  },
];

export function LandingPage() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <h1 className="text-xl font-semibold text-gray-900">AssetFlow</h1>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button>Get started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero section */}
        <div className="relative isolate pt-14">
          <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Manage your assets with confidence
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  AssetFlow helps organizations track, manage, and optimize their inventory with powerful tools and real-time insights.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link to="/register">
                    <Button size="lg">Get started</Button>
                  </Link>
                  <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Everything you need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Powerful inventory management
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Take control of your organization's assets with our comprehensive management solution.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-5 w-5 flex-none text-blue-600" />
                      {feature.name}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm leading-5 text-gray-400">
              &copy; 2024 AssetFlow. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}