import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'P@$$w0rd',
  database: 'lojadb'
})

console.log('> Banco de dados conectado com sucesso.');
export default connection;
