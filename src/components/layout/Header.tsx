'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/auth/useAuth';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            AI Storybook
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/bookshelf" className="hover:text-primary-foreground/80">
                  My Books
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-primary-foreground/80"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary-foreground/80">
                  Login
                </Link>
                <Link href="/signup" className="hover:text-primary-foreground/80">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header; 