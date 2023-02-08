import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { Link } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro} from '../components/toastr'


class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    validar(){
        const msgs = []

        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório.')
        }

        if(!this.state.email){
            msgs.push('O nome email é obrigatório.')
        }else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            msgs.push('Informe um email válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x.')
        }else if(this.state.senha !== this.state.senhaRepeticao){
            msgs.push('As senhas não batem.')
        }

        return msgs;
    }

    cadastrar = () => {
        const msgs = this.validar();

        if(msgs && msgs.length > 0){
            msgs.forEach( (msg, index) =>{
                mensagemErro(msg)
            })
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        }
        
        this.service.salvarUsuario(usuario)
            .then( response => {
                mensagemSucesso('Usuario cadastrado com sucesso! Faça o login para acessar o sistema!')
                setTimeout(function() {
                    window.location.href="http://localhost:3000/login"
                }, 2000);
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    id="inputNome"
                                    className='form-control'
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    id='inputEmail'
                                    className='form-control'
                                    name='Email'
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id='inputSenha'
                                    className='form-control'
                                    name='Senha'
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    id='inputRepitaSenha'
                                    className='form-control'
                                    name='Senha'
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <button type='button' className='btn btn-success' onClick={this.cadastrar}>Salvar</button>
                            <Link to="/login"><button type='button' className='btn btn-danger'>Cancelar</button></Link>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default CadastroUsuario