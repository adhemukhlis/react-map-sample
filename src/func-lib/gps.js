export const get_gps_location = ( func ) => {
	if ( navigator.geolocation ) {
		navigator
			.geolocation
			.getCurrentPosition( func )
	} else {
		alert( "Geolocation is not supported by this browser." )
	}
}