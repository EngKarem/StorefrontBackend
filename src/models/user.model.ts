import {User} from '../types/user.type';
import config  from '../config';
import client from '../database';
import bcrypt from 'bcrypt';

export let hashed:string;

const hashPassword = (password:string)=>{
  const salt = parseInt(config.salt as string,10);
  return bcrypt.hashSync(password + config.pepper, salt);
}

export class UserModel{

  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await client.connect();

      const query = 'SELECT * FROM users';

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

  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();

      const query = 'SELECT * FROM users WHERE id=($1)';

      //  run query
      const result = await conn.query(query, [id]);

      //  release connection
      conn.release();

      //  return Selected user
      return result.rows[0];

    } catch (err) {
      throw new Error(`Unable to find user ${id}. Error: ${err}`);
    }
  }

  async createUser(u: User):Promise<User[]>{
    try {
      // @ts-ignore
      const connection = await client.connect()

      const query = `INSERT INTO users (id,firstname,lastname,password) VALUES ($1,$2,$3,$4) returning *`

      hashed = hashPassword(u.password);
      //  run query
      const result = await connection.query(query,[u.id,u.firstname, u.lastname, hashed])

      //  release connection
      connection.release()

      //  return created user
      return result.rows[0]
    }
    catch (error){
      throw new Error(`Cannot create user: ${error}`)
    }
  }

  // delete user
  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const connection = await client.connect();

      const query = `DELETE FROM users WHERE id=($1) RETURNING id, firstname, lastname`;

      //  run query
      const result = await connection.query(query, [id]);

      //  release connection
      connection.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete user ${id}, ${(error as Error).message}`);
    }
  }

  async authenticate(name: string, pass: string): Promise<User | null> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const query = 'SELECT password FROM users WHERE firstname=$1';

      //  run query
      const result = await connection.query(query, [name]);

      if (result.rows.length) {

        const user = result.rows[0]

        const isPasswordValid:boolean = bcrypt.compareSync(`${pass}${config.pepper}`, user.password)

        if (isPasswordValid) {
          const userInfo = await connection.query('SELECT id, firstname, lastname FROM users WHERE firstname=($1)', [name])
          return userInfo.rows[0]
        }
      }

      //  release connection
      connection.release()
      return null
    } catch (error) {
      throw new Error(`login failed: ${error}`)
    }
  }
}

