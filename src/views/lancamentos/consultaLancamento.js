import React  from "react";
import Card from "../../components/card";
import {Link} from "react-router-dom"
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from './lancamentosTable';
import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component{

    state = {
        ano:'',
        mes:'',
        tipo:'',
        descricao:'',
        lancamentos: []
    }

    editar = (id) => {
        console.log(id)
    }

    deletar = (id) => {
        console.log('deletando' + id)
    }

    buscar = () =>{
        if(!this.state.ano){
            messages.mensagemErro("O preenchimento do campo ano é obrigatório.")
            return false;
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro)
        .then( response => {
            this.setState({lancamentos: response.data})
        }).catch(error => {
            console.log(error)
        })
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    render(){
        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterTipos();

        return(
            <Card title="Consulta lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label= "Ano: *">
                                <input type="text" value = {this.state.ano} onChange={e => this.setState({ano: e.target.value})}  className="form-control" id="inputAno" aria-describedby="emailHelp" placeholder="Digite o Ano" />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputMes" label= "Mês: ">
                                <SelectMenu id="inputMes" value = { this.state.mes } onChange={e => this.setState({mes: e.target.value})} lista = {meses} className="form-control" />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputDescricao" label= "Descricao: ">
                                <input type="text" value = {this.state.descricao} onChange={e => this.setState({descricao: e.target.value})}  className="form-control" id="inputAno" aria-describedby="emailHelp" placeholder="Digite o Ano" />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputTipo" label= "Tipo lançamento ">
                                <SelectMenu id="inputTipo" value = { this.state.tipo } onChange={e => this.setState({tipo: e.target.value})} lista = {tipos} className="form-control"/>
                            </FormGroup>
                            <br/>
                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                              deleteAction = {this.deletar}
                                              editAction = {this.editar}
                            ></LancamentosTable>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}   

export default ConsultaLancamentos;