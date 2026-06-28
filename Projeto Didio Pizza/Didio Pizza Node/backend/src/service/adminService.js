import * as adminRepository from '../repository/adminRepository.js';
import { generateToken } from '../utils/jwt.js';


export async function criarAdmin(admin) {

    if (!admin.email || !admin.senha) {
        throw new Error('Dados incompletos.');
    }

    let emailExistente = await adminRepository.buscarAdminPorEmail(admin.email);
    if (emailExistente) {
        throw new Error('Email já cadastrado.')
    }

    let id = await adminRepository.criarConta(admin);
    
    return id;
}


export async function loginAdmin(admin) {
    let usuario = await adminRepository.login(admin.email, admin.senha);
    
    if (!usuario) {
        throw new Error('Email ou senha inválidos. Verifique suas credenciais e tente novamente.');
    }

    let token = generateToken({
        id: usuario.id,
        tipo: 'ADMIN'
    });

    return token;
}