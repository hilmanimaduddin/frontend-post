export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  photo: string;
  posts: Post[];
  likes: Like[];
  createdAt: string;
}

export interface Post {
  id: string;
  caption: string;
  tags: string;
  image: string;
  userId: string;
  user: User;
  likes: Like[];
  createdAt: string;
}

export interface Like {
  id: string;
  postId: string;
  userId: string;
  liked: boolean;
  user: User;
  post: Post;
  createdAt: string;
}
