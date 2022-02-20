interface CategoryTypes {
  id: number;
  displayName: string;
  createdAt: Date | string;
  products?: Array<object>;
}

export default CategoryTypes;
