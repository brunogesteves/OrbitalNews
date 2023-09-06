export interface contentNewsProps {
  id: number;
  title: string;
  image: string;
  content: string;
  section: string;
  slug: string;
  posted_at: Date;
  categoryId?: number;
  category: {
    name: string;
  };
}

export interface LoginProps {
  email: string;
  password: string;
}
