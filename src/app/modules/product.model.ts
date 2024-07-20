export interface Product {
  _id?: string;
  name: string;
  amount: number;
  dateAdded: Date;
  marked: boolean;
  comments: string;
  category: string;
  image?: string;
  imageUrl?: string;
  changed?: boolean;
  hasImage?: boolean;
}