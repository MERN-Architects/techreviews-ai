import { useState } from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin, FiFacebook } from 'react-icons/fi';

const socialLinks = [
  { name: 'Twitter', href: '#', icon: FiTwitter },
  { name: 'Facebook', href: '#', icon: FiFacebook },
  { name: 'LinkedIn', href: '#', icon: FiLinkedin },
  { name: 'GitHub', href: '#', icon: FiGithub },
];

const footerLinks = [
  {
    title: 'Product Categories',
    links: [
      { name: 'Tech Reviews', href: '/category/tech' },
      { name: 'Gaming', href: '/category/gaming' },
      { name: 'Smart Home', href: '/category/smart-home' },
      { name: 'Accessories', href: '/category/accessories' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Buying Guides', href: '/guides' },
      { name: 'Deals', href: '/deals' },
      { name: 'Compare Products', href: '/compare' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Newsletter */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              TechReviews.AI
            </Link>
            <p className="text-gray-600">
              AI-powered product reviews and recommendations you can trust.
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Subscribe to our newsletter
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-4">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-base text-gray-600 hover:text-primary-600"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-primary-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-6 w-6" />
                  </a>
                );
              })}
            </div>
            <p className="mt-4 md:mt-0 text-base text-gray-400">
              &copy; {new Date().getFullYear()} TechReviews.AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 