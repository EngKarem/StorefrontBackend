import dotenv from 'dotenv'

dotenv.config()

const {
  Port,
  ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
  TOKEN_SECRET,
} = process.env

export default {
  port: Port,
  env:ENV,
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  testDatabase: POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  pass: POSTGRES_PASSWORD,
  dbPort:POSTGRES_PORT,
  pepper:BCRYPT_PASSWORD,
  salt:SALT_ROUNDS,
  token:TOKEN_SECRET,
}