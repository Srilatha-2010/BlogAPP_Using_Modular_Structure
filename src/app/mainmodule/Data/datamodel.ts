export interface Post {
  id?: number;
  name: string;
  text: any;
  time?: string;
  image?: string;
  hide?:boolean;
  collapsed ?: boolean;
}
export interface Data{
  user :string;
  pwd :string;
}