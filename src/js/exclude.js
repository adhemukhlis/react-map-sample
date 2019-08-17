var map;
var route_tmp = 0;
var directionsDisplay;
var directionsService;
function proses( ori, des ) {       
	if ( route_tmp == 1 ) {
		change_route( )
	}
	directionsDisplay = new window.google.maps.DirectionsRenderer;
	directionsService = new window.google.maps.DirectionsService;
	directionsDisplay.setMap( map );
	calculateAndDisplayRoute( directionsService, directionsDisplay, ori, des );
	route_tmp = 1
}
function change_route( ) {
	directionsDisplay.setMap( null )
}
function calculateAndDisplayRoute( directionsService, directionsDisplay, pos, des ) {
	directionsService
		.route({
			origin: pos,
			destination: des,
			travelMode: window.google.maps.TravelMode['DRIVING']
		}, function ( response, status ) {
			if ( status == 'OK' ) {
				directionsDisplay.setDirections( response )
			} else {
				window.alert( 'Directions request failed due to ' + status )
			}
		})
}