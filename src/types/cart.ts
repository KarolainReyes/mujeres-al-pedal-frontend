export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

export type CartItem = {
  productId: string;
  size: ProductSize;
  quantity: number;
};
