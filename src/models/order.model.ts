import {Order} from '../types/order.type';
import client from '../database';

export class OrderModel{
  async OrderByUser(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const query = 'SELECT * FROM orders INNER JOIN orderdetails o on orders.id = o.order_id WHERE orders.user_id=($1)'

      //  run query
      const result = await conn.query(query,[id])
      //  release connection
      conn.release()

      //  return users
      return result.rows

    } catch (err) {
      throw new Error(`Unable to get Orders. Error: ${err}`)
    }
  }

  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();

      const query = 'SELECT * FROM orders';

      //  run query
      const result = await conn.query(query);
      //  release connection
      conn.release();

      //  return users
      return result.rows;

    } catch (err) {
      throw new Error(`Unable to get users. Error: ${err}`);
    }
  }

  async create(o: Order):Promise<Order[]>{
    try {
      // @ts-ignore
      const connection = await client.connect();

      const query = `INSERT INTO orders (id,user_id,status) VALUES ($1, $2, $3) returning *`;

      //  run query
      const result = await connection.query(query,[o.id, o.user_id, o.status]);

      //  release connection
      connection.release();

      //  return created user
      return result.rows[0];
    }
    catch (error){
      throw new Error(`Unable to create Order: ${(error as Error).message}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const connection = await client.connect();

      const query = `DELETE FROM orders WHERE id=($1) RETURNING id, status`;

      const result = await connection.query(query, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete order ${id}, ${(error as Error).message}`);
    }
  }
}