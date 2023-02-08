import apiService from "./apiService";

class UsuarioService extends apiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    obterSaldoPorUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvarUsuario(usuario){
        return this.post('', usuario);
    }
}

export default UsuarioService;