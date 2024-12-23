import { GoogleGenerativeAI } from '@google/generative-ai';

if (!process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY) {
  throw new Error('Missing NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function testGeminiAPI(): Promise<string> {
  try {
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: "Write a very short children's story about a friendly dragon (2-3 sentences only)." }]
      }]
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error testing Gemini API:', error);
    throw error;
  }
}

const ONBOARDING_PROMPT = `You are a friendly assistant helping a young child (ages 3-5) create a storybook. Your responses should be warm, encouraging, and use simple language appropriate for young children. You will have a conversation with the child to gather information for their story.

Your goal is to collect the following information in a natural, conversational way:
- Child's name
- Reading level (based on age)
- Story theme they're interested in
- Main character's name
- Story setting
- Plot elements they want in the story
- How long they want the story to be

After each response from the child, you should:
1. Acknowledge their input positively
2. Store the relevant information if provided
3. Ask the next question in a fun, engaging way

Your responses should be:
- Short and simple (1-2 sentences)
- Enthusiastic and encouraging
- Easy to understand for a young child

Output format: Your responses should include:
1. A message to speak to the child
2. Any information collected in JSON format

Example response:
{
  "message": "That's a wonderful name! Do you like stories about magical places, space adventures, or friendly animals?",
  "collected_data": {
    "name": "Emily",
    "reading_level": 1
  }
}`;

export interface CollectedData {
  name?: string;
  reading_level?: number;
  story_theme?: string;
  main_character?: string;
  setting?: string;
  plot_points?: string[];
  story_length?: 'short' | 'medium' | 'long';
}

export interface GeminiResponse {
  message: string;
  collected_data: CollectedData;
}

export async function startOnboardingChat(): Promise<GeminiResponse> {
  try {
    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: ONBOARDING_PROMPT }]
      }]
    });
    
    const response = await result.response;
    const text = response.text();
    
    return {
      message: "Hi there! I'm so excited to help you create your very own storybook! Can you tell me your name?",
      collected_data: {}
    };
  } catch (error) {
    console.error('Error starting chat:', error);
    throw error;
  }
}

export async function continueOnboardingChat(
  message: string,
  previousData: CollectedData = {}
): Promise<GeminiResponse> {
  try {
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: ONBOARDING_PROMPT }]
        },
        {
          role: 'model',
          parts: [{ text: JSON.stringify({
            message: "Hi there! I'm so excited to help you create your very own storybook! Can you tell me your name?",
            collected_data: {}
          })}]
        },
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ]
    });

    const response = await result.response;
    const text = response.text();
    
    try {
      const parsed = JSON.parse(text);
      return {
        message: parsed.message,
        collected_data: { ...previousData, ...parsed.collected_data }
      };
    } catch (error) {
      console.error('Error parsing Gemini response:', error);
      return {
        message: "I didn't quite understand that. Can you tell me again?",
        collected_data: previousData
      };
    }
  } catch (error) {
    console.error('Error continuing chat:', error);
    throw error;
  }
} 