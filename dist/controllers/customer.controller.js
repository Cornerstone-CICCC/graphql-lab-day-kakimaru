"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const customer_model_1 = require("../models/customer.model");
const getCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_model_1.Customer.find();
    if (!customers)
        throw new Error(`Failed to get customers`);
    return customers;
});
const getCustomerById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_model_1.Customer.findById(id);
    if (!customer)
        throw new Error(`Customer not found`);
    return customer;
});
const createCustomer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = new customer_model_1.Customer(data);
    if (!customer)
        throw new Error(`Failed to create new customer`);
    return yield customer.save();
});
const updateCustomer = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_model_1.Customer.findByIdAndUpdate(id, data, { new: true });
    if (!customer)
        throw new Error(`Failed to update the customer`);
    return customer;
});
const deleteCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customer_model_1.Customer.findByIdAndDelete(id);
    if (!customer)
        return false;
    return true;
});
exports.default = {
    getCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
};
