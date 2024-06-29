export interface Product {
  id: number;
  name: string;
  amount: number;
  dateAdded: Date;
  marked: boolean;
  comments: string;
  category: string;   
  image?: string;
  changed?: boolean; 
  hasImage?: boolean; 
}