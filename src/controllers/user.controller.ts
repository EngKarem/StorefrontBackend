import express  from 'express';
import {UserModel} from '../models/user.model';
import jwt  from 'jsonwebtoken'
import config from '../config'
import { User } from '../types/user.type';

const userModel = new  UserModel();

export const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    };
    const newUser = await userModel.createUser(user);
    res.status(200).json(jwt.sign({user: newUser}, config.token as string));
  } catch (error) {
    res.status(200).json(error);
  }
}

export const index = async (_: express.Request, res: express.Response) => {
  try {
    const users = await userModel.index();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json(error)
  }
}

export const show = async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.show(req.params.id as unknown as string)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}


export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const user = await userModel.delete(req.params.id as unknown as string)
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json(error)
  }
}


export const authenticate = async (req: express.Request, res: express.Response) => {
  try {
    const user: User = {
      firstname: req.body.firstname,
      password: req.body.password
    }
    const u = await userModel.authenticate(user.firstname, user.password)
    res.json(jwt.sign({ user: u },config.token as string))
  } catch(error) {
    res.status(400).json(error)
  }
}