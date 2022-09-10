import {Product} from '../types/product.type';
import client from '../database';

export class ProductModel{

  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await client.connect()
      const sql = 'SELECT * FROM products'

      //  run query
      const result = await conn.query(sql)
      //  release connection
      conn.release()

      //  return users
      return result.rows

    } catch (err) {
      throw new Error(`Unable to get products. Error: ${err}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await client.connect()

      const sql = 'SELECT * FROM products WHERE id=($1)'

      //  run query
      const result = await conn.query(sql, [id])

      //  release connection
      conn.release()

      //  return Selected user
      return result.rows[0]

    } catch (err) {
      throw new Error(`Unable to find product ${id}. Error: ${err}`)
    }
  }

  async create(p: Product):Promise<Product[]>{
    try {
      // @ts-ignore
      const connection = await client.connect()

      const query = `INSERT INTO products (id,name,Price,Category) VALUES ($1,$2,$3,$4) returning *`

      //  run query
      const result = await connection.query(query,[p.id,p.name, p.price, p.category])

      //  release connection
      connection.release()

      //  return created user
      return result.rows[0]
    }
    catch (error){
      throw new Error(`Cannot create Product: ${error}`)
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const connection = await client.connect();

      const query = `DELETE FROM products WHERE id=($1) RETURNING id, name, price`;

      const result = await connection.query(query, [id]);

      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete product ${id}, ${(error as Error).message}`);
    }
  }

}