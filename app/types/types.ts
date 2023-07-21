export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  [key: string]: any;
}

export enum SortType {
  ASC = "asc",
  DESC = "desc",
  NONE = "none",
}
