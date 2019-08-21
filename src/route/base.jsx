import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Map from "../pages/Map/map";
import Login from "../pages/Login/login";
import Home from "../pages/Home/home";
import { PATH_DIR } from "./path";
import Menubar from "../component/menubar/menubar";
class Base extends Component {
	render( ) {
		return (
			<div>
				<Menubar>
					<Route path={PATH_DIR.home} exact component= { ( ) =>< Home />}/>
					<Route path={PATH_DIR.login} component= { ( ) =>< Login />}/>
					<Route path={PATH_DIR.map} component= { ( ) =>< Map />}/>
				</Menubar>
			</div>
		)
	}
}
export default Base;