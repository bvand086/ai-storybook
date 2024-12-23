import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Book } from '@/types/book';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error: fetchError } = await supabase
        .from('books')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setBooks(data || []);
    } catch (err: any) {
      setError(err.message);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (bookData: Partial<Book>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('books')
        .insert([
          {
            ...bookData,
            user_id: user.id,
            created_at: new Date().toISOString(),
            status: 'draft'
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setBooks(prevBooks => [data, ...prevBooks]);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    books,
    loading,
    error,
    fetchBooks,
    createBook
  };
} 