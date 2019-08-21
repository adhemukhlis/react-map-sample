import React, { Component } from 'react';
class Home extends Component {
	render( ) {
		return (
			<div style={{
				width: '100vw',
				height: '100vh',
                                backgroundColor: '#eee',
                                color:'#555',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
				<h1>Home</h1>
			</div>
		)
	}
}
export default Home;