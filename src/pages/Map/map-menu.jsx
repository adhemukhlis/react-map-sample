import React, { Component } from 'react';
import { places_type } from "../../config/config-project";
import { map_menu, map_menu_item } from "../../style/style";
import { get_places } from "../../firebase/firebase-ref";
class Menu extends Component {
	state = {
		loading: false
	};
	loading_done = ( ) => {
		this.setState({ loading: false })
	}
	get_place_data = ( callback, place_type ) => {
		this.setState({ loading: true });
		get_places( callback, place_type, this.loading_done )
	}
	render( ) {
		const { callback } = this.props;
		const { loading } = this.state;
		return (
			<div style={map_menu}>{places_type.map(data => (
					<button style={map_menu_item} disabled={loading} key={data.id} onClick={( ) => this.get_place_data( callback, data.id )}>{data.type_name}</button>
				))}</div>
		)
	}
}
export default Menu;