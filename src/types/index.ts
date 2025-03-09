export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  subcategory?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories?: Category[];
}