import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {loggout} from '../../../store/actions/auth'
import './header.css'

export const header = props => {
	return (
		<div className="header">
			<nav>
				<ul>
					<li><Link to="/">Feed</Link></li>
					<li><Link to="/perfil">Perfil</Link></li>
					<li><button onClick={() => props.onLoggout()}>Sair</button></li>
				</ul>
			</nav>
		</div>
		)
}


const mapDispatchToProps = dispatch => {
	return{
		onLoggout: () => dispatch(loggout())
	}
}

export default connect(null,mapDispatchToProps)(header)