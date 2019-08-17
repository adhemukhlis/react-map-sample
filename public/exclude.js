var map;
var route_tmp = 0;
var directionsDisplay;
var directionsService;
function test( i ) {
	console.log( i )
}
function proses( ori, des ) {
        console.log("func proses ok");
        console.log(ori);
        console.log(des);
        console.log(map);
        
	if ( route_tmp == 1 ) {
		change_route( )
	}
	directionsDisplay = new google.maps.DirectionsRenderer;
	directionsService = new google.maps.DirectionsService;
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
			travelMode: google.maps.TravelMode['DRIVING']
		}, function ( response, status ) {
			if ( status == 'OK' ) {
				directionsDisplay.setDirections( response )
			} else {
				window.alert( 'Directions request failed due to ' + status )
			}
		})
}