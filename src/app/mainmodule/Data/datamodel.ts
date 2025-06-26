export interface Post {
  id?: number;
  name: string;
  text: any;
  time?: string;
  image: string;     
  hide?: boolean;
  videoUrl?: string;
  collapsed?: boolean;
}

export interface Data{
  user :string;
  pwd :string;
}

export interface ChatMessage {
  user: string;
  message: string;
}