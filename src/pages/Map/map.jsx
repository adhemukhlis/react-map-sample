import React, { Component } from 'react';
import {center_container, fullscreen} from "../../style/style";
import { mounting_script } from "../../func-lib/load-script";
import { get_gps_location } from "../../func-lib/gps";
import { place_data_parser } from "../../func-lib/place-data-parser";
import { get_place_name_by_id } from "../../func-lib/search-obj";
import { places_type } from "../../config/config-project";
import MARKER_IMG from "../../assets/marker.svg";
import Menu from "./map-menu";
import MapCenter from "./map-center-button";
import Center from "../../assets/center.svg";
import { map_setting, info_window_content } from "../../config/config-map";
import { dummy_user, dummy_loc } from "../../dummy/loc-dummy";
let user_marker,
	infowindow_tmp,
	infowindow_flag;
let arr_marker_position_index = 0;
let arr_marker_position = [ ];
let marker_tmp = [ ];
class Map extends Component {
	state = {
		user_loc: null,
		places: [ ]
	};
	componentWillMount( ) {
		mounting_script( )
	}
	componentDidMount( ) {
		get_gps_location( this.set_position )
	}
	load_places_data = ( data ) => {
		this.load_place(place_data_parser( data ))
	}
	set_position = ( position ) => {
		const pos = {
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
			const marker = new window
				.google
				.maps
				.Marker({ position: data.coord, map: window.map, title: data.label, animation: window.google.maps.Animation.DROP });
			this.set_infowindow_content( marker, data.label, data.place_type, data.verified );
			marker_tmp.push( marker )
		}, timeout )
	}
	set_infowindow_content = ( marker, place_name, k_place_type, k_verified ) => {
		arr_marker_position.push(marker.getPosition( ));
		const place_type = get_place_name_by_id( k_place_type, places_type, 'type_name' );
		const verified_status = parseInt( k_verified ) === 0
			? 'Untrusted'
			: 'Trusted';
		const infowindow_content = info_window_content(place_name, place_type, verified_status, dummy_user, this.get_marker_position( arr_marker_position_index ));
		const infowindow = new window
			.google
			.maps
			.InfoWindow({ content: infowindow_content, maxWidth: 1000 });
		marker.addListener('click', ( ) => {
			if ( infowindow_flag ) {
				infowindow_tmp.setMap( null )
			}
			infowindow.open( marker.get( 'map' ), marker );
			infowindow_tmp = infowindow;
			infowindow_flag = true
		});
		arr_marker_position_index += 1
	}
	get_marker_position = ( i ) => {
		const result = {
			lat: arr_marker_position[i].lat( ),
			lng: arr_marker_position[i].lng( )
		};
		return result
	}
	clear_place_marker = ( ) => {
		marker_tmp.map(data => data.setMap( null ));
		marker_tmp = [ ]
	}
	set_map_center = ( ) => {
		window
			.map
			.setCenter( this.state.user_loc )
	}
	render( ) {
		return (
			<div style={center_container}>
				<div style={fullscreen} id='map'/>
				<MapCenter action={this.set_map_center}/>
				<Menu callback={this.load_places_data}/>
			</div>
		)
	}
}
export default Map;