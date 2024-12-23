'use client';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} AI Storybook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 