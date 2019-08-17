var map,
	route_set,
	directionsDisplay,
	directionsService;
function proses( ori, des ) {
	route_set
		? change_route( )
		: null;
	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsService = new google.maps.DirectionsService;
	directionsDisplay.setMap( map );
	calculateAndDisplayRoute( directionsService, directionsDisplay, ori, des );
	route_set = true
}
function change_route( ) {
	directionsDisplay.setMap( null )
}
function calculateAndDisplayRoute( directionsService, directionsDisplay, pos, des ) {
	directionsService
		.route({
			origin: pos,
			destination: des,
			travelMode: google.maps.TravelMode['DRIVING']
		}, function ( response, status ) {
			if ( status == 'OK' ) {
				directionsDisplay.setDirections( response )
			} else {
				window.alert( 'Directions request failed due to ' + status )
			}
		})
}