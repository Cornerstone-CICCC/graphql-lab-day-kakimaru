import { Order } from "../models/order.model";
import { IOrder } from "../types/order";

const getOrders = async () => {
  const orders = await Order.find()
    .populate("productId")
    .populate("customerId");
  if (!orders) throw new Error(`Failed to get orders`);
  return orders;
};

const getOrderById = async (id: string) => {
  const order = await Order.findById(id)
    .populate("productId")
    .populate("customerId");
  if (!order) throw new Error(`Failed to get the order`);
  return order;
};

const createOrder = async (data: Omit<IOrder, "id">) => {
  const order = new Order(data);
  if (!order) throw new Error(`Failed to create new order`);
  return await order.save();
};

const updateOrder = async (id: string, data: Partial<IOrder>) => {
  const order = await Order.findByIdAndUpdate(id, data, { new: true });
  if (!order) throw new Error(`Failed to update the order`);
  return order;
};

export default {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
};
