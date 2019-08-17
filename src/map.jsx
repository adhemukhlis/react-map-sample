import React, { Component } from 'react';
import MARKER_IMG from "./img/map/my_marker.png";
import { map_style } from "./config/config_map";
import { dummy_fc, dummy_ti, dummy_user, dummy_user2 } from "./dummy/loc_dummy";
import { dummy_loc } from "./config/config_project";
let map,
	marker_tmp,
	infow_tmp;
let loaded_place_1 = false,
	loaded_place_2 = false;
let infow_flag = 0;
let arrmarkerpositionindex = 0;
let arrmarkerposition = [ ];
let mark_object = [ ];
let marks_place_1 = [ ];
let marks_place_2 = [ ];
class Map extends Component {
	state = {
		user_loc: null
	};
	componentWillMount( ) {
		const script2 = document.createElement( "script" );
		script2.src = "https://rawcdn.githack.com/adhemukhlis/react-map-sample/fcedf3898be4663b4ffef2b87ffb49c0dbce87f7/src/js/exclude.js";
		const script = document.createElement( "script" );
		script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB56WOzpBWhLD6hkIdIZgpOplSz_1pm1mk";
		script.async = true;
		script.defer = true;
		document
			.body
			.appendChild( script2 );
		document
			.body
			.appendChild( script );
		// const script2 = document.createElement( "script" );
		// script2.src = "https://github.com/adhemukhlis/react-map-sample/blob/master/src/js/exclude.js";
		// script.async = true;
		// script.defer = true;
		// document
		// 	.body
		// 	.appendChild( script2 )
	}
	componentDidMount( ) {
		if ( navigator.geolocation ) {
			navigator
				.geolocation
				.getCurrentPosition( this.set_position )
		} else {
			console.log( "Geolocation is not supported by this browser." )
		}
		dummy_fc.forEach(element => {
			console.log( element.id );
			let tmp = {
				coord: {
					lat: parseFloat( element.lat ),
					lng: parseFloat( element.lng )
				},
				label: element.label,
				place_type: element.place_type,
				verified: element.verified
			};
			marks_place_1.push( tmp )
		});
		dummy_ti.forEach(element => {
			console.log( element.id );
			let tmp = {
				coord: {
					lat: parseFloat( element.lat ),
					lng: parseFloat( element.lng )
				},
				label: element.label,
				place_type: element.place_type,
				verified: element.verified
			};
			marks_place_2.push( tmp )
		});
		console.log( marks_place_2 )
	}
	set_position = ( position ) => {
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
		console.log( pos );
		this.setState({
			user_loc: dummy_loc
				? dummy_user
				: pos
		});
		let timeout = setTimeout( ( ) => {
			this.load_map( this.state.user_loc )
		}, 3000 );
	}
	load_map = ( position ) => {
		window.map = new window
			.google
			.maps
			.Map(document.getElementById( 'map' ), {
				center: position,
				zoom: 16,
				mapTypeControl: false,
				fullscreenControl: false,
				scaleControl: false,
				streetViewControl: false,
				styles: map_style,
				zoomControl: true,
				zoomControlOptions: {
					position: window.google.maps.ControlPosition.RIGHT_CENTER
				}
			});
		this.set_user_marker_position( position )
	}
	set_user_marker_position = ( position ) => {
		var marker = new window
			.google
			.maps
			.Marker({ position: position, map: window.map, title: 'Lokasi Anda', icon: MARKER_IMG });
		marker_tmp = marker
	}
	init_place_1 = ( ) => {
		arrmarkerpositionindex = 0;
		arrmarkerposition = [ ];
		this.load_place_1( )
	}
	init_place_2 = ( ) => {
		arrmarkerpositionindex = 0;
		arrmarkerposition = [ ];
		this.load_place_2( )
	}
	load_place_1 = ( ) => {
		if ( mark_object.length > 0 ) {
			this.delete_all_Markers( marks_place_1.length )
		}
		for ( var i = 0; i < marks_place_1.length; i += 1 ) {
			this.addMarkers( marks_place_1[i], i * 200 )
		}
	}
	load_place_2 = ( ) => {
		if ( mark_object.length > 0 ) {
			this.delete_all_Markers( marks_place_2.length )
		}
		for ( var i = 0; i < marks_place_2.length; i += 1 ) {
			this.addMarkers( marks_place_2[i], i * 200 )
		}
	}
	addMarkers = ( pro, timeout ) => {
		window.setTimeout( ( ) => {
			var marker2 = new window
				.google
				.maps
				.Marker({ position: pro.coord, map: window.map, title: pro.label, animation: window.google.maps.Animation.DROP });
			this.label_name( marker2, pro.label, pro.place_type, pro.verified );
			mark_object.push( marker2 )
		}, timeout )
	}
	label_name = ( marker, place_name, k_place_type, k_verified ) => {
		console.log( marker );
		let place_type = null;
		if ( k_place_type == 'ti' ) {
			place_type = 'Tempat Ibadah'
		} else if ( k_place_type == 'pom' ) {
			place_type = 'SPBU'
		} else if ( k_place_type == 'fc' ) {
			place_type = 'Fotocopy'
		} else if ( k_place_type == 'rs' ) {
			place_type = 'Rumah Sakit'
		}
		this.setmarkerposarr(marker.getPosition( ));
		let verified_status;
		if ( k_verified == 0 ) {
			verified_status = 'Untrusted'
		} else {
			verified_status = 'Trusted'
		}
		console.log(this.get_markerposition( arrmarkerpositionindex ).lat( ));
		let contentString = '   <div>         <h6>' + place_type + '</h6>             <h3 >' + place_name + '</h3>             <ul>                 <li><h5>' + verified_status + '</h5></li>                 <li>kami menyarankan untuk pengguna untuk memilih tempat yang terpercaya</li>             </ul>  <button onclick="proses({lat:' + dummy_user.lat + ',lng:' + dummy_user.lng + '},{lat:' + this
			.get_markerposition( arrmarkerpositionindex )
			.lat( ) + ',lng:' + this
			.get_markerposition( arrmarkerpositionindex )
			.lng( ) + '} );">nav</button>  </div>  ';
		console.log(this.get_markerposition( arrmarkerpositionindex ));
		arrmarkerpositionindex += 1;
		let infowindow = new window
			.google
			.maps
			.InfoWindow({ content: contentString, maxWidth: 1000 });
		marker.addListener('click', ( ) => {
			if ( infow_flag == 1 ) {
				this.change_infoWindow( infow_tmp )
			}
			infowindow.open( marker.get( 'map' ), marker );
			this.push_infoWindow( infowindow );
			infow_flag = 1
		})
	}
	get_markerposition = ( i ) => {
		return arrmarkerposition[i]
	}
	push_infoWindow = ( infow ) => {
		infow_tmp = infow
	}
	setmarkerposarr = ( posnew ) => {
		arrmarkerposition.push( posnew );
		console.log( posnew )
	}
	change_infoWindow = ( infowindow ) => {
		infowindow.setMap( null )
	}
	delete_all_Markers = ( length_o ) => {
		var content = mark_object.length;
		for ( var i = 0; i < content; i += 1 ) {
			mark_object[i].setMap( null )
		}
		mark_object = [ ]
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
					height: "10vh",
					backgroundColor: "#00f"
				}}>
					<button onClick={( ) => this.init_place_1( )}>place 1</button>
					<button onClick={( ) => this.init_place_2( )}>place 2</button>
				</div>
			</div>
		)
	}
}
export default Map;