import express from 'express'
import config from '../config'
import jwt from 'jsonwebtoken'

const validateToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const authorizationHeader  = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1]
    const decode = jwt.verify(token, config.token as unknown as string);
    if(decode)
    {
      next();
    }
  }
  catch(error) {
    res.status(200)
    res.json(`Access denied, invalid token`)
    return
  }
}

export default validateToken