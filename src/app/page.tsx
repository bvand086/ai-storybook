import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to AI Storybook
      </h1>
      <p className="text-xl mb-8 max-w-2xl">
        Create personalized stories powered by AI. Perfect for young readers and storytellers alike.
      </p>
      <div className="flex gap-4">
        <Link
          href="/signup"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg hover:bg-secondary/90"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
