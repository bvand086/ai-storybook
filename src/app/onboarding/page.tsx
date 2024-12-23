import ConversationalOnboarding from '@/components/onboarding/ConversationalOnboarding';

export default function OnboardingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Let's Create Your Story!</h1>
        <p className="text-muted-foreground">
          Just talk to me, and I'll help you create your very own storybook!
        </p>
      </div>
      <ConversationalOnboarding />
    </div>
  );
} 