import React, { Component } from 'react';
import { mounting_script } from "./funclib/load-script";
import { get_gps_location } from "./funclib/gps";
import { place_data_parser } from "./funclib/place-data-parser";
import { get_place_name_by_id } from "./funclib/search-obj";
import { places_type } from "./config/config-project";
import MARKER_IMG from "./img/map/my_marker.png";
import { map_setting, info_window_content } from "./config/config-map";
import { dummy_fc, dummy_ti, dummy_user, dummy_loc } from "./dummy/loc-dummy";
let user_marker,
	winfowindow_tmp;
let infowindow_flag;
let arr_marker_position_index = 0;
let arr_marker_position = [ ];
let marker_tmp = [ ];
class Map extends Component {
	state = {
		user_loc: null
	};
	componentWillMount( ) {
		mounting_script( )
	}
	componentDidMount( ) {
		get_gps_location( this.set_position )
	}
	set_position = ( position ) => {
		let pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		this.setState({
			user_loc: dummy_loc
				? dummy_user
				: pos
		});
		window.setTimeout( ( ) => {
			this.load_map( this.state.user_loc )
		}, 1000 )
	}
	load_map = ( position ) => {
		window.map = new window
			.google
			.maps
			.Map(document.getElementById( 'map' ), map_setting( position ));
		this.set_user_marker_position( position )
	}
	set_user_marker_position = ( position ) => {
		user_marker = new window
			.google
			.maps
			.Marker({ position: position, map: window.map, title: 'Lokasi Anda', icon: MARKER_IMG })
	}
	init_place_1 = ( ) => {
		this.load_place(place_data_parser( dummy_fc ))
	}
	init_place_2 = ( ) => {
		this.load_place(place_data_parser( dummy_ti ))
	}
	load_place = ( place_data ) => {
		arr_marker_position_index = 0;
		arr_marker_position = [ ];
		if ( marker_tmp.length > 0 ) {
			this.clear_place_marker( )
		}
		place_data.map(( data, i ) => this.add_place_marker( data, i * 140 ))
	}
	add_place_marker = ( data, timeout ) => {
		window.setTimeout( ( ) => {
			let marker = new window
				.google
				.maps
				.Marker({ position: data.coord, map: window.map, title: data.label, animation: window.google.maps.Animation.DROP });
			this.label_name( marker, data.label, data.place_type, data.verified );
			marker_tmp.push( marker )
		}, timeout )
	}
	label_name = ( marker, place_name, k_place_type, k_verified ) => {
		const place_type = get_place_name_by_id( k_place_type, places_type, 'type_name' );
		this.set_marker_position_arr(marker.getPosition( ));
		const verified_status = parseInt( k_verified ) === 0
			? 'Untrusted'
			: 'Trusted';
		let infowindow_content = info_window_content(place_name, place_type, verified_status, dummy_user, this.get_marker_position( arr_marker_position_index ));
		arr_marker_position_index += 1;
		let infowindow = new window
			.google
			.maps
			.InfoWindow({ content: infowindow_content, maxWidth: 1000 });
		marker.addListener('click', ( ) => {
			if ( infowindow_flag ) {
				this.change_infowindow( winfowindow_tmp )
			}
			infowindow.open( marker.get( 'map' ), marker );
			this.push_infowindow( infowindow );
			infowindow_flag = true
		})
	}
	get_marker_position = ( i ) => {
		const result = {
			lat: arr_marker_position[i].lat( ),
			lng: arr_marker_position[i].lng( )
		};
		return result
	}
	push_infowindow = ( val ) => {
		winfowindow_tmp = val
	}
	set_marker_position_arr = ( pos ) => {
		arr_marker_position.push( pos )
	}
	change_infowindow = ( infowindow ) => {
		infowindow.setMap( null )
	}
	clear_place_marker = ( ) => {
		marker_tmp.map(data => data.setMap( null ));
		marker_tmp = [ ]
	}
	render( ) {
		return (
			<div style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
				<div style={{
					width: "100vw",
					height: "100vh"
				}} id='map'/>
				<div style={{
					position: 'absolute',
					display: 'flex',
					justifyContent: 'space-evenly',
					bottom: 10,
					width: "50vw",
					height: "10vh", // backgroundColor: "#00f" }}>
					<button onClick={( ) => this.init_place_1( )}>place 1</button>
					<button onClick={( ) => this.init_place_2( )}>place 2</button>
				</div>
			</div>
		)
	}
}
export default Map;