import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'

import './index.css'
import App from './App'
import storeConfig from './store/storeConfig'

const store = storeConfig()

const Redux = () => {
	return (<Provider store={store}>
		<App />
	</Provider>)
}


ReactDOM.render(<Redux />,document.getElementById('root'))
