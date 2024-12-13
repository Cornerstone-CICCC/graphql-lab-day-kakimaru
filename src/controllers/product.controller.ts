import { Product } from "../models/product.model";
import { IProduct } from "../types/product";

const getProducts = async () => {
  const products = await Product.find();
  return products;
};

const getProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new Error(`Failed to get the product`);
  return product;
};

const createProduct = async (data: Omit<IProduct, "id">) => {
  const product = new Product(data);
  return await product.save();
};

const updateProduct = async (id: string, data: Partial<IProduct>) => {
  const product = await Product.findByIdAndUpdate(id, data, { new: true });
  if(!product) throw new Error(`Failed to update the product`)
  return product
};

const deleteProduct = async (id: string) => {
  const product = await Product.findByIdAndDelete(id)
  if(!product) return false
  return true
}
export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
