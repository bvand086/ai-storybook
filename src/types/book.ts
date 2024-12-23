export interface Book {
  id: string;
  title: string;
  cover_image_url: string;
  reading_level: number;
  created_at: string;
  user_id: string;
  status: 'draft' | 'published';
  content: {
    pages: {
      text: string;
      image_url?: string;
    }[];
  };
  metadata: {
    theme: string;
    main_character: string;
    setting: string;
    plot_points: string[];
    length: 'short' | 'medium' | 'long';
  };
} 