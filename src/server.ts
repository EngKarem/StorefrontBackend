import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import routes from './routes';
import { Sequelize } from 'sequelize';
const app: express.Application = express()

app.use(bodyParser.json())

app.use('/api', routes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

const sequelize = new Sequelize(
  "postgres://postgres:postgres1@database-2.czzmqmqh2zx7.us-east-1.rds.amazonaws.com:5432/postgres"
);

app.use((_req:Request,res:Response):void=>{
    res.status(404).json({
        message: 'Invalid Url'
    })
})

app.listen(3000, function () {
    console.log(`server started at http://localhost:${3000}`);
})

export default app;