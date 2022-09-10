import express  from 'express';
import {OrderModel} from '../models/order.model';
const orderModel = new  OrderModel()

export const OrderByUser = async (req: express.Request, res: express.Response) => {
  try {
    const orders = await orderModel.OrderByUser(req.params.user_id as unknown as string);
    res.status(200).json(orders);
  } catch (error) {
    res.status(200).json(error)
  }
};

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const order = await orderModel.create(req.body)
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json(error)
  }
};

export const deleteOrder = async (req: express.Request, res: express.Response) => {
  try {
    const order = await orderModel.delete(req.params.id as unknown as string)
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json(error)
  }
};

