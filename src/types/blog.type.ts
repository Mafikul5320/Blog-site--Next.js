export interface Post {
  post_id: string;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  status: "PUBLISHED" | "DRAFT"; 
  tag: string[];
  views: number;
  authorId: string;
  createAt: string;
  updateAt: string;
  _count: {
    posts: number;
  };
}