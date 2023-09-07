export interface contentNewsProps {
  id?: number;
  title: string;
  image: string;
  content: string;
  slug: string;
  section: string;
  posted_at: Date;
  audio: string;
  file: string;
  categoryId?: number;
  category: {
    name: string;
  };
}

export interface LoginProps {
  email: string;
  password: string;
}
