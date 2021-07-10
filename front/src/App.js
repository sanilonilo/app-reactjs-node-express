import React,{useState,useEffect} from 'react'
import {HashRouter,Switch, Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from './components/templates/header/header'
import axios from 'axios'
import './App.css'
import Auth from './components/login/cadastroELogin'
import Feed from './components/feed/feed'
import Perfil from './components/perfil/perfil'


import {validarToken} from './store/actions/auth'

export const App = props => {
    const [carregado,setCarregado] = useState(false)

    useEffect(() => {
        props.onValidarToken(props.auth.usuario)
        setCarregado(true)
    },[])

    const renderizarAppOrAuth = () => {
        if(props.auth.tokenValido){
            axios.defaults.headers.common['Authorization'] = `bearer ${props.auth.usuario.token}`
            return (
            <Switch>
                <Route exact path="/" component={Feed}/>
                <Route  path="/perfil" component={Perfil}/>
                <Redirect from="*" to="/"/>
            </Switch>
                )
        }

        else if(!props.auth.tokenValido && !props.auth.usuario){
            return(
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Redirect from="*" to="/auth"/>
            </Switch>
            )
        }

        else{
            return false
        }
    }

  return (
    <HashRouter>
    	{props.auth.usuario && <Header/>}

        {carregado && renderizarAppOrAuth()}
    	
    </HashRouter>
    )
}

const mapStateToProps = ({auth}) => {
    return{
        auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onValidarToken: usuario => dispatch(validarToken(usuario))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

