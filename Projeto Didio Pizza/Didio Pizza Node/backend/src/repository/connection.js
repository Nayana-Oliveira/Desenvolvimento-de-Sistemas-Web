    import mysql from 'mysql2/promise';

    const connection = await mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DATABASE,
        waitForConnections: true,
        connectionLimit: 15,
        queueLimit: 50
    })

    console.log('Conexão com o banco de dados estabelecida com sucesso!');

    export default connection;