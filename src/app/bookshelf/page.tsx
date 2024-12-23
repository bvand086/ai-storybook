'use client';

import { useBooks } from '@/hooks/useBooks';
import { BookCard } from '@/components/bookshelf/BookCard';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PlusCircle, BookOpen } from 'lucide-react';

export default function BookshelfPage() {
  const { books, loading, error } = useBooks();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-32 bg-muted rounded"></div>
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading books: {error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <BookOpen className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Bookshelf is Empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Start your journey by creating your first personalized storybook!
        </p>
        <Button
          onClick={() => router.push('/onboarding')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Create Your First Book
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Button
          onClick={() => router.push('/onboarding')}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Create New Book
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
} 