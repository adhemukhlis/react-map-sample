import React, { Component } from 'react';
class SideBar extends Component {
	render( ) {
		return (
			<div style={{
				width: '100vw'
			}}>
				<div style={{
					width: '100%',
					height: '70px',
					display: 'flex',
					alignItems: 'center',
					position: 'absolute',
					backgroundColor: '#333',
					zIndex: 999
				}}>
					<span style={{
						color: '#fff'
					}}>React Map</span>
				</div>{this.props.children}</div>
		)
	}
}
export default SideBar;