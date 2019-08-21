import React, { Component } from 'react';
import Center from "../../assets/center.svg";
import {map_button} from "../../style/style";
class CenterButton extends Component {
	render( ) {
                const {action} = this.props
		return (
			<button onClick={action} style={map_button}>
				<img src={Center} style={{
					height: '18px',
					width: '18px'
				}} alt=""/>
			</button>
		)
	}
}
export default CenterButton;