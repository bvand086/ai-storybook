'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  OnboardingData,
  READING_LEVELS,
  STORY_THEMES,
  PLOT_POINTS,
  STORY_LENGTHS,
} from '@/types/onboarding';
import StepIndicator from './StepIndicator';

const STEPS = [
  {
    title: 'Reading Level',
    description: 'Choose a reading level appropriate for your child.',
    fieldName: 'readingLevel' as const,
  },
  {
    title: 'Story Theme',
    description: 'Select a theme for your story.',
    fieldName: 'storyTheme' as const,
  },
  {
    title: 'Main Character',
    description: 'Tell us about the main character.',
    fieldName: 'mainCharacterName' as const,
  },
  {
    title: 'Story Setting',
    description: 'Describe where the story takes place.',
    fieldName: 'setting' as const,
  },
  {
    title: 'Plot Points',
    description: 'Choose elements to include in your story.',
    fieldName: 'plotPoints' as const,
  },
  {
    title: 'Story Length',
    description: 'How long would you like your story to be?',
    fieldName: 'storyLength' as const,
  },
];

const initialData: OnboardingData = {
  readingLevel: 1,
  storyTheme: '',
  mainCharacterName: '',
  setting: '',
  plotPoints: [],
  storyLength: 'medium',
};

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      // TODO: Send data to API to generate story
      console.log('Submitting:', formData);
      router.push('/bookshelf');
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };

  const updateField = (field: keyof OnboardingData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    const step = STEPS[currentStep];

    switch (step.fieldName) {
      case 'readingLevel':
        return (
          <div className="space-y-4">
            <Select
              value={formData.readingLevel.toString()}
              onValueChange={(value) => updateField('readingLevel', parseInt(value))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reading level" />
              </SelectTrigger>
              <SelectContent>
                {READING_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value.toString()}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'storyTheme':
        return (
          <div className="space-y-4">
            <Select
              value={formData.storyTheme}
              onValueChange={(value) => updateField('storyTheme', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select story theme" />
              </SelectTrigger>
              <SelectContent>
                {STORY_THEMES.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'mainCharacterName':
        return (
          <div className="space-y-4">
            <Label htmlFor="characterName">Character Name</Label>
            <Input
              id="characterName"
              value={formData.mainCharacterName}
              onChange={(e) => updateField('mainCharacterName', e.target.value)}
              placeholder="Enter character name"
            />
          </div>
        );

      case 'setting':
        return (
          <div className="space-y-4">
            <Label htmlFor="setting">Setting Description</Label>
            <Textarea
              id="setting"
              value={formData.setting}
              onChange={(e) => updateField('setting', e.target.value)}
              placeholder="Describe the story setting..."
            />
          </div>
        );

      case 'plotPoints':
        return (
          <div className="space-y-4">
            {PLOT_POINTS.map((point) => (
              <div key={point.value} className="flex items-center space-x-2">
                <Checkbox
                  id={point.value}
                  checked={formData.plotPoints.includes(point.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateField('plotPoints', [...formData.plotPoints, point.value]);
                    } else {
                      updateField(
                        'plotPoints',
                        formData.plotPoints.filter((p) => p !== point.value)
                      );
                    }
                  }}
                />
                <Label htmlFor={point.value}>{point.label}</Label>
              </div>
            ))}
          </div>
        );

      case 'storyLength':
        return (
          <div className="space-y-4">
            <Select
              value={formData.storyLength}
              onValueChange={(value) => updateField('storyLength', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select story length" />
              </SelectTrigger>
              <SelectContent>
                {STORY_LENGTHS.map((length) => (
                  <SelectItem key={length.value} value={length.value}>
                    {length.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto p-6">
      <div className="space-y-6">
        <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} />
        
        <div>
          <h2 className="text-2xl font-bold">{STEPS[currentStep].title}</h2>
          <p className="text-muted-foreground">{STEPS[currentStep].description}</p>
        </div>

        {renderStepContent()}

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep === STEPS.length - 1 ? 'Create Story' : 'Next'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default OnboardingWizard; 