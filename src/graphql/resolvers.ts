import customerController from "../controllers/customer.controller";
import productController from "../controllers/product.controller";
import { ICustomer } from "../types/customer";
import { IProduct } from "../types/product";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    // orders: () => {},
    getProductById: async (_: unknown, { id }: { id: string }) =>
      await productController.getProductById(id),
    getCustomerById: async (_: unknown, { id }: { id: string }) =>
      await customerController.getCustomerById(id),
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

    addCustomer: async (
      _: unknown,
      { firstName, lastName, email }: Omit<ICustomer, "id">
    ) =>
      await customerController.createCustomer({ firstName, lastName, email }),
    editCustomer: async (
      _: unknown,
      { id, firstName, lastName, email }: ICustomer
    ) =>
      await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      }),
    removeCustomer: async (_: unknown, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),

    // addOrder: () => {},
    // editOrder: () => {},
    // removeOrder: () => {}
  },
};
