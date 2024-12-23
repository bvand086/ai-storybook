export interface OnboardingData {
  readingLevel: number;
  storyTheme: string;
  mainCharacterName: string;
  setting: string;
  plotPoints: string[];
  storyLength: 'short' | 'medium' | 'long';
}

export interface OnboardingStep {
  title: string;
  description: string;
  fieldName: keyof OnboardingData;
}

export const READING_LEVELS = [
  { value: 1, label: 'Early Reader (Ages 4-6)' },
  { value: 2, label: 'Beginner (Ages 6-8)' },
  { value: 3, label: 'Intermediate (Ages 8-10)' },
  { value: 4, label: 'Advanced (Ages 10-12)' },
];

export const STORY_THEMES = [
  { value: 'adventure', label: 'Adventure' },
  { value: 'fantasy', label: 'Fantasy' },
  { value: 'mystery', label: 'Mystery' },
  { value: 'science', label: 'Science & Discovery' },
  { value: 'friendship', label: 'Friendship' },
];

export const PLOT_POINTS = [
  { value: 'challenge', label: 'Overcome a Challenge' },
  { value: 'friend', label: 'Make a New Friend' },
  { value: 'learn', label: 'Learn Something New' },
  { value: 'help', label: 'Help Someone in Need' },
  { value: 'discover', label: 'Make a Discovery' },
];

export const STORY_LENGTHS = [
  { value: 'short', label: '5-7 pages' },
  { value: 'medium', label: '8-12 pages' },
  { value: 'long', label: '13-15 pages' },
]; 