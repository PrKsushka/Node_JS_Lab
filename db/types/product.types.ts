type Ratings = {
  userId: number;
  rating: number;
};
interface ProductsTypes {
  id?: number;
  _id?: number;
  displayName: string;
  categoryId: any;
  createdAt: Date | string;
  totalRating: number;
  price: number;
  ratings?: Array<Ratings>;
}

export default ProductsTypes;
