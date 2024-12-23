# AI Storybook

An AI-powered storybook application that creates personalized stories for young readers. Built with Next.js, Supabase, and Google's Gemini AI.

## Features

- 📚 Personalized storybook generation
- 🎨 AI-generated illustrations
- 🔊 Interactive reading experience with speech synthesis
- 📱 Responsive design for all devices
- 🔐 Secure authentication with Supabase
- 👥 User-specific bookshelves

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Supabase (Auth & Database)
- **AI**: Google Gemini 1.5 Flash, Flux AI
- **Deployment**: Vercel (planned)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Supabase account
- Google Gemini API key
- Flux AI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/bvand086/ai-storybook.git
   cd ai-storybook
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your API keys and configuration.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Google Gemini API Configuration
NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY=your_gemini_api_key

# Flux AI Configuration
FLUX_API_KEY=your_flux_api_key
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── bookshelf/     # Bookshelf components
│   ├── layout/        # Layout components
│   ├── onboarding/    # Onboarding wizard components
│   └── reader/        # Story reader components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and API clients
��   ├── api/          # API integration
│   ├── db/           # Database utilities
│   └── utils/        # Helper functions
└── types/            # TypeScript type definitions
```

## Development Guidelines

- Follow TypeScript strict mode guidelines
- Use ShadCN UI components where possible
- Implement proper error handling
- Write meaningful commit messages
- Keep components focused and maintainable
- Use server components by default unless client interactivity is needed

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
