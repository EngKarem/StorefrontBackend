import { Pool } from 'pg';
import config from './config'

let client = new Pool();

if(config.env === 'test') {
  client = new Pool({
    host: config.host,
    database: config.testDatabase,
    user: config.user,
    password: config.pass,
  })
}

if(config.env === 'dev') {
  client = new Pool({
    host: config.host,
    database: config.database,
    user: config.user,
    password: config.pass,
  })
}

client.on('error', (err:Error)=>{
  console.error(err.message);
})

export default client;