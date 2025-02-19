import { Link } from 'react-router-dom';
import { Box, CheckCircle, Shield, Waves, BarChart3, Users } from 'lucide-react';
import { Button } from '../components/ui/button';

const features = [
  {
    name: 'Real-time Analytics',
    description: 'Track every asset in real-time with detailed analytics and insights.',
    icon: BarChart3,
    color: 'bg-blue-500',
  },
  {
    name: 'Team Management',
    description: 'Collaborate seamlessly with your team and manage access controls.',
    icon: Users,
    color: 'bg-purple-500',
  },
  {
    name: 'Smart Tracking',
    description: 'Intelligent asset tracking with automated notifications and alerts.',
    icon: Box,
    color: 'bg-green-500',
  },
  {
    name: 'Secure Platform',
    description: 'Enterprise-grade security ensures your data stays protected.',
    icon: Shield,
    color: 'bg-indigo-500',
  },
  {
    name: 'Efficient Workflows',
    description: 'Streamlined processes for borrowing, returns, and maintenance.',
    icon: Waves,
    color: 'bg-pink-500',
  },
  {
    name: 'Quality Assurance',
    description: 'Maintain high standards with detailed quality checks and reports.',
    icon: CheckCircle,
    color: 'bg-orange-500',
  },
];

const testimonials = [
  {
    content: "AssetFlow has transformed how we manage our inventory. It's intuitive and powerful.",
    author: "Sarah Johnson",
    role: "Operations Manager",
    company: "TechCorp Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    content: "The best inventory management system we've ever used. The analytics are incredible.",
    author: "Michael Chen",
    role: "IT Director",
    company: "Global Solutions",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
];

export function LandingPage() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8 backdrop-blur-md bg-white/70">
          <div className="flex lg:flex-1 items-center space-x-2">
            <img src="/logo.svg" alt="AssetFlow" className="h-8 w-auto" />
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
        <div className="relative isolate">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          
          <div className="py-24 sm:py-32 lg:pb-40">
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
                    <Button size="lg" className="text-lg px-8 py-6">
                      Start your free trial
                    </Button>
                  </Link>
                  <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 flex items-center">
                    Learn more <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
              
              <div className="mt-16 flow-root sm:mt-24">
                <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
                    alt="App screenshot"
                    className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature section */}
        <div className="py-24 sm:py-32 bg-gray-50">
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
              <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature.name} className="flex flex-col">
                    <div className="flex items-center gap-x-3">
                      <div className={`rounded-lg ${feature.color} p-2.5`}>
                        <feature.icon className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold leading-7 text-gray-900">
                        {feature.name}
                      </h3>
                    </div>
                    <p className="mt-4 text-base leading-7 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-lg font-semibold leading-8 tracking-tight text-blue-600">Testimonials</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Trusted by industry leaders
              </p>
            </div>
            <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex flex-col bg-white rounded-2xl shadow-lg p-8">
                    <blockquote className="flex-1 text-lg leading-8 text-gray-900">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="mt-6 flex items-center">
                      <img
                        className="h-12 w-12 rounded-full"
                        src={testimonial.image}
                        alt={testimonial.author}
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{testimonial.author}</div>
                        <div className="text-gray-600">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative isolate mt-32 px-6 py-32 sm:mt-40 sm:py-40 lg:px-8">
          <div className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl">
            <div
              className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]"
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Ready to get started?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Join thousands of organizations already using AssetFlow to manage their assets efficiently.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/register">
                <Button size="lg" className="text-lg">
                  Start your free trial
                </Button>
              </Link>
              <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900">
                Contact sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">Footer</h2>
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="AssetFlow" className="h-8 w-auto brightness-200" />
              <span className="text-white text-lg font-semibold">AssetFlow</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                About
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                Features
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                Pricing
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                Terms
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} AssetFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}