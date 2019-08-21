import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import Base from "./base";
class Route extends Component {
	render( ) {
		return (
			<HashRouter>
				<Base/>
			</HashRouter>
		)
	}
}
export default Route;