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
const order_model_1 = require("../models/order.model");
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find()
        .populate("productId")
        .populate("customerId");
    if (!orders)
        throw new Error(`Failed to get orders`);
    return orders;
});
const getOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(id)
        .populate("productId")
        .populate("customerId");
    if (!order)
        throw new Error(`Failed to get the order`);
    return order;
});
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new order_model_1.Order(data);
    if (!order)
        throw new Error(`Failed to create new order`);
    return yield order.save();
});
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findByIdAndUpdate(id, data, { new: true });
    if (!order)
        throw new Error(`Failed to update the order`);
    return order;
});
exports.default = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
};
