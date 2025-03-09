# TechReviews.AI

AI-powered tech product reviews and recommendations platform built with Next.js.

## Features

- 🤖 AI-generated product reviews
- 📱 Responsive design for all devices
- 🔍 Advanced search and filtering
- 📊 Product comparisons
- 🌙 Daily product updates
- 💬 User comments and ratings

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- OpenAI API
- Framer Motion
- GitHub Actions

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/techreviews-ai.git
cd techreviews-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
- Create a `.env.local` file in the root directory
- Add your OpenAI API key:
```
OPENAI_API_KEY=your-api-key-here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Automatic Updates

The project uses GitHub Actions to automatically generate and add new product reviews daily. To set this up:

1. Go to your GitHub repository settings
2. Navigate to Secrets and Variables > Actions
3. Add a new secret with name `OPENAI_API_KEY` and your API key as the value

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 