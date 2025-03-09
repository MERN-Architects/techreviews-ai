import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // TODO: Implement newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="flex gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg text-gray-900 bg-white"
          required
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            status === 'loading'
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-white text-primary-600 hover:bg-gray-100'
          }`}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {status === 'success' && (
        <p className="mt-2 text-sm text-green-600">Thanks for subscribing!</p>
      )}
      {status === 'error' && (
        <p className="mt-2 text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
} 