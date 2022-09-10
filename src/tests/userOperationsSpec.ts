import {UserModel} from '../models/user.model';
import {hashed} from '../models/user.model';

const userModel = new  UserModel();


describe('User Model', () => {
  it('Should have an index method', () => {
    expect(userModel.index).toBeDefined();
  });

  it('Should have an show method', () => {
    expect(userModel.show).toBeDefined();
  });

  it('Should have an create method', () => {
    expect(userModel.createUser).toBeDefined();
  });

  it('Should have an delete method', () => {
    expect(userModel.delete).toBeDefined();
  });

  it('create method should add a user', async () => {

    await userModel.createUser({
      id :1,
      firstname: 'test',
      lastname: 'user',
      password: 'password123',
    });
    const result = await userModel.index()
    expect(result).toEqual([{
      id :1,
      firstname: 'test',
      lastname: 'user',
      password: hashed,
    }]);
  });


  it('index method should return a list of users', async () => {
    const result = await userModel.index();
    expect(result).toEqual([{
      id :1,
      firstname: 'test',
      lastname: 'user',
      password: hashed,
    }]);
  });

  it('show method should return the correct user', async () => {
    const result = await userModel.show("1");
    expect(result).toEqual({
      id: 1,
      firstname: 'test',
      lastname: 'user',
      password: hashed,
    });
  });

  it('delete method should remove the user', async () => {
    await userModel.delete("1");
    const result = await userModel.index()
    expect(result).toEqual([]);
  });
});