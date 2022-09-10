import express  from 'express';
import {ProductModel} from '../models/product.model';
const productModel = new  ProductModel()

export const index = async (_: express.Request, res: express.Response) => {
  try {
    const products = await productModel.index();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json(error)
  }
}

export const show = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productModel.show(req.params.id as unknown as string)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json(error)
  }
}

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productModel.create(req.body)
    res.status(200).json(product)
  }catch (error){
    res.status(400).json(error)
  }
};

export const deleteProduct = async (req: express.Request, res: express.Response) => {
  try {
    const product = await productModel.delete(req.params.id as unknown as string)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json(error)
  }
};