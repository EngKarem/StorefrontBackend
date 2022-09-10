import {ProductModel} from '../models/product.model';
import { hashed } from '../models/user.model';

const productModel = new  ProductModel();

describe('Product Model', () => {
  it('Should have an index method', () => {
    expect(productModel.index).toBeDefined();
  });

  it('Should have an show method', () => {
    expect(productModel.show).toBeDefined();
  });

  it('Should have an create method', () => {
    expect(productModel.create).toBeDefined();
  });

  it('create method should add a product', async () => {

    await productModel.create({
      id :1,
      name: 'test',
      price: 40,
      category: 'Cat1',
    });
    const result = await productModel.index()
    expect(result).toEqual([{
      id :1,
      name: 'test',
      price: 40,
      category: 'Cat1',
    }]);
  });

  it('index method should return a list of products', async () => {
    const result = await productModel.index();
    expect(result).toEqual([{
      id :1,
      name: 'test',
      price: 40,
      category: 'Cat1',
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await productModel.show("1");
    expect(result).toEqual({
      id :1,
      name: 'test',
      price: 40,
      category: 'Cat1',
    });
  });

  it('delete method should remove the product', async () => {
    await productModel.delete("1");
    const result = await productModel.index()
    expect(result).toEqual([]);
  });
});