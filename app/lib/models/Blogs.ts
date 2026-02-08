export interface Blog {
  id?: string;
  title: string;
  description: string;
  author: string;
}

export interface BlogState {
  id?: boolean;
  success: boolean;
  message: string;
}
