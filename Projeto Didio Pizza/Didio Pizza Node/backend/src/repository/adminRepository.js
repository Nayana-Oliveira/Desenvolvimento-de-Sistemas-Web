import connection from './connection.js';


export async function criarConta(admin) {
    let comando = `
        INSERT INTO admin (email, senha)
        VALUES (?, MD5(?))
    `;

    const [resposta] = await connection.query(comando, [
        admin.email,
        admin.senha
    ]);

    return resposta.insertId;
}


export async function login(email, senha) {
    let comando = `
        SELECT id, email
            FROM admin
        WHERE email = ? AND senha = MD5(?)
    `

    const [linhas] = await connection.query(comando, [
        email,
        senha
    ])

    return linhas[0];
}


export async function buscarAdminPorEmail(email) {
    let comando = `
        SELECT * FROM admin
        WHERE email = ?
    `;

    const [linhas] = await connection.query(comando, [email]);

    return linhas[0];
}