'use client';

import { useState } from 'react';
import { testGeminiAPI } from '@/lib/api/gemini';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function TestGeminiPage() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await testGeminiAPI();
      setResult(response);
    } catch (err: any) {
      setError(err.message || 'An error occurred while testing the API');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Test Gemini API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={handleTest}
            disabled={loading}
          >
            {loading ? 'Generating Story...' : 'Generate Test Story'}
          </Button>

          {error && (
            <div className="p-4 bg-destructive/10 text-destructive rounded-md">
              {error}
            </div>
          )}

          {result && (
            <div className="p-4 bg-muted rounded-md">
              <h3 className="font-semibold mb-2">Generated Story:</h3>
              <p>{result}</p>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <h3 className="font-semibold mb-1">API Details:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Model: gemini-1.5-flash</li>
              <li>Task: Generate a short children's story</li>
              <li>API Key Status: {process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY ? '✅ Set' : '❌ Missing'}</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 