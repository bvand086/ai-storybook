'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { startOnboardingChat, continueOnboardingChat, CollectedData } from '@/lib/api/gemini';

export function ConversationalOnboarding() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('');
  const [collectedData, setCollectedData] = useState<CollectedData>({});
  const [recognition, setRecognition] = useState<any>(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const [isParentMode, setIsParentMode] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          handleUserInput(transcript);
        };

        recognition.onend = () => {
          setIsListening(false);
          setIsAnimating(false);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
          setIsAnimating(false);
          if (event.error === 'not-allowed') {
            setIsSpeechSupported(false);
          }
        };

        setRecognition(recognition);
      } else {
        setIsSpeechSupported(false);
      }
    }
  }, []);

  // Start the conversation
  useEffect(() => {
    startConversation();
  }, []);

  const startConversation = async () => {
    try {
      const response = await startOnboardingChat();
      setAssistantMessage(response.message);
      speak(response.message);
    } catch (error) {
      console.error('Error starting conversation:', error);
      setAssistantMessage("Oops! I had a little trouble. Let's try again!");
    }
  };

  const handleUserInput = async (input: string) => {
    try {
      const response = await continueOnboardingChat(input, collectedData);
      setCollectedData(response.collected_data);
      setAssistantMessage(response.message);
      speak(response.message);

      // If we have all the required data, proceed to story creation
      if (isOnboardingComplete(response.collected_data)) {
        router.push('/create-story');
      }
    } catch (error) {
      console.error('Error processing user input:', error);
      setAssistantMessage("I didn't quite catch that. Can you say it again?");
      speak("I didn't quite catch that. Can you say it again?");
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower for children
      utterance.pitch = 1.1; // Slightly higher pitch for friendliness
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition && !isListening) {
      setIsAnimating(true);
      recognition.start();
      setIsListening(true);
      setTranscript('');
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      handleUserInput(textInput);
      setTextInput('');
    }
  };

  const isOnboardingComplete = (data: CollectedData): boolean => {
    return !!(
      data.name &&
      data.reading_level &&
      data.story_theme &&
      data.main_character &&
      data.setting &&
      data.plot_points?.length &&
      data.story_length
    );
  };

  const toggleParentMode = () => {
    setIsParentMode(!isParentMode);
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-6">
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Let's Create Your Story!</h2>
          <p className="text-muted-foreground">
            {isListening ? "I'm listening..." : "Press the button and tell me your answer!"}
          </p>
          {!isSpeechSupported && (
            <p className="text-yellow-600 text-sm mt-2">
              Speech recognition isn't available. Using text input instead.
            </p>
          )}
        </div>

        <div className="bg-secondary/10 rounded-lg p-4">
          <p className="text-lg mb-4">{assistantMessage}</p>
          {transcript && (
            <p className="text-sm text-muted-foreground">
              You said: {transcript}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {(isSpeechSupported && !isParentMode) ? (
            <div className="flex flex-col items-center gap-4">
              <Button
                size="lg"
                onClick={startListening}
                disabled={isListening}
                className={`rounded-full w-16 h-16 p-0 transition-transform duration-200 ${
                  isAnimating ? 'scale-110 animate-pulse' : ''
                }`}
              >
                {isListening ? "🎤" : "🗣️"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleParentMode}
                className="text-xs"
              >
                Switch to Parent Mode
              </Button>
            </div>
          ) : (
            <form onSubmit={handleTextSubmit} className="space-y-2">
              <Input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full"
              />
              <div className="flex justify-between">
                <Button type="submit" disabled={!textInput.trim()}>
                  Send
                </Button>
                {isSpeechSupported && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleParentMode}
                    className="text-xs"
                  >
                    Switch to Kid Mode
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ConversationalOnboarding; 