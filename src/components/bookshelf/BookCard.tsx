import { Book } from '@/types/book';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { READING_LEVELS } from '@/types/onboarding';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const readingLevel = READING_LEVELS.find(level => level.value === book.reading_level)?.label || 'Unknown Level';

  return (
    <Link href={`/books/${book.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl">
          <img
            src={book.cover_image_url || '/placeholder-cover.jpg'}
            alt={book.title}
            className="object-cover w-full h-full"
          />
          {book.status === 'draft' && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
              Draft
            </div>
          )}
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="line-clamp-2">{book.title}</CardTitle>
          <p className="text-sm text-muted-foreground">{readingLevel}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            Theme: {book.metadata.theme}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
} 