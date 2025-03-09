# TechReviews.AI

A modern tech review platform built with Next.js, TypeScript, and MongoDB.

## Features

- Product reviews and comparisons
- Advanced search functionality
- Rating and review system
- MongoDB database integration
- OpenAI powered content generation
- Amazon Product API integration
- Responsive design with Tailwind CSS

## Tech Stack

- Next.js 14
- TypeScript
- MongoDB with Prisma ORM
- OpenAI API
- Amazon Product Advertising API
- Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/techreviews-ai.git
cd techreviews-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a .env file in the root directory and add:
```
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
AMAZON_ACCESS_KEY=your_amazon_access_key
AMAZON_SECRET_KEY=your_amazon_secret_key
AMAZON_PARTNER_TAG=your_amazon_partner_tag
```

4. Run the development server:
```bash
npm run dev
```

5. Generate database schema:
```bash
npx prisma generate
```

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm start`: Start production server
- `npm run lint`: Run ESLint
- `npm run generate`: Generate test products

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. 