import { Customer } from "../models/customer.model";
import { ICustomer } from "../types/customer";

const getCustomers = async () => {
  const customers = await Customer.find();
  if (!customers) throw new Error(`Failed to get customers`);
  return customers;
};

const getCustomerById = async (id: string) => {
  const customer = await Customer.findById(id);
  if (!customer) throw new Error(`Customer not found`);
  return customer;
};

const createCustomer = async (data: Omit<ICustomer, "id">) => {
  const customer = new Customer(data);
  if (!customer) throw new Error(`Failed to create new customer`);
  return await customer.save();
};

const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  const customer = await Customer.findByIdAndUpdate(id, data, { new: true });
  if (!customer) throw new Error(`Failed to update the customer`);
  return customer;
};

const deleteCustomer = async (id: string) => {
  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) return false;
  return true;
};

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
