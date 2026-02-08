export interface Blog {
  id?: string;
  title: string;
  description: string;
  author: string;
}

export interface BlogState {
  id?: string;
  success: boolean;
  message: string;
}
