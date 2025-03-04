export type Post = {
  id: string;
  text: string;
  createdAt: Date;
  userId: string;
};

export type User = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  Posts?: Post[];
};

export interface PostItemProps extends Post {
  user: User;
}
