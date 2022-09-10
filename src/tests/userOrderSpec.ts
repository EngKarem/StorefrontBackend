import {OrderModel} from '../models/order.model';
import {UserModel} from '../models/user.model';

const userModel = new  UserModel();
const orderModel = new  OrderModel();


describe('Order Model', () => {

  beforeAll(async function() {
    await userModel.createUser({
      id: 1,
      firstname: 'test',
      lastname: 'user',
      password: 'password123',
    });
  });


  it('Should have an OrderByUser method', () => {
    expect(orderModel.OrderByUser).toBeDefined();
  });
  it('Should have an index method', () => {
    expect(orderModel.index).toBeDefined();
  });

  it('Should have an delete method', () => {
    expect(orderModel.delete).toBeDefined();
  });
  
  it('create method should add a order', async () => {
    await orderModel.create({
      id:1,
      user_id: 1,
      status: 'active'
    });
  });

  it('index method should return a list of orders', async () => {
    const result = await orderModel.index();
    expect(result).toEqual([{
      id:1,
      user_id: 1,
      status: 'active'
    }]);
  });

  it('delete method should remove the order', async () => {
    await orderModel.delete("1");
    const result = await orderModel.index()
    expect(result).toEqual([]);
  });

});