import productController from "../controllers/product.controller";
import { IProduct } from "../types/product";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    // customers: () => {},
    // orders: () => {},
    getProductById: async (_: unknown, { id }: { id: string }) =>
      await productController.getProductById(id),
    // getCustomerById: () => {},
  },
  // Product: {
  //   customers: () => {}
  // },
  // Customer: {
  //   products: () => {}
  // },
  // Order: {
  //   product: () => {},
  //   customer: () => {}
  // },
  Mutation: {
    addProduct: async (
      _: unknown,
      { productName, productPrice }: Omit<IProduct, "id">
    ) => await productController.createProduct({ productName, productPrice }),
    editProduct: async (
      _: unknown,
      { id, productName, productPrice }: IProduct
    ) =>
      await productController.updateProduct(id, { productName, productPrice }),
    removeProduct: async (_: unknown, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    // addCustomer: () => {},
    // editCustomer: () => {},
    // removeCustomer: () => {},

    // addOrder: () => {},
    // editOrder: () => {},
    // removeOrder: () => {}
  },
};
