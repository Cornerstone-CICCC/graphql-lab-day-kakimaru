import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import productController from "../controllers/product.controller";
import { Customer } from "../models/customer.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { ICustomer } from "../types/customer";
import { IOrder } from "../types/order";
import { IProduct } from "../types/product";

// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, { id }: { id: string }) =>
      await productController.getProductById(id),
    getCustomerById: async (_: unknown, { id }: { id: string }) =>
      await customerController.getCustomerById(id),
    getOrderById: async (_: unknown, { id }: { id: string }) =>
      await orderController.getOrderById(id),
  },
  Product: {
    customers: async (parent: { id: string }) => {
      const orders = await Order.find({ productId: parent.id });
      const customers = orders.map(async (order) => {
        const customer = await Customer.findById(order.customerId);
        return customer;
      });
      return customers;
    },
  },
  Customer: {
    products: async (parent: { id: string }) => {
      const orders = await Order.find({ customerId: parent.id });
      const products = orders.map(async (order) => {
        const product = await Product.findById(order.productId);
        return product;
      });
      return products;
    },
  },
  Order: {
    product: async (parent: { productId: string }) =>
      await productController.getProductById(parent.productId),
    customer: async (parent: { customerId: string }) =>
      await customerController.getCustomerById(parent.customerId),
  },
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

    addOrder: async (
      _: unknown,
      { productId, customerId }: Omit<IOrder, "id">
    ) => await orderController.createOrder({ productId, customerId }),
    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) =>
      await orderController.updateOrder(id, { productId, customerId }),
    // removeOrder: () => {}
  },
};
