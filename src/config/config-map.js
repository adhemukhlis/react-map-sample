export const info_window_content = ( place_name, place_type, verified_status, origin, destination ) => ( '<div style="width:40vh;display:flex;flex-direction:column;"><h2>' + place_name + '</h2><br/><small>' + place_type + '</small><b>' + verified_status + '</b><i>kami menyarankan untuk pengguna untuk memilih tempat yang terpercaya</i><button onclick="proses({lat:' + origin.lat + ',lng:' + origin.lng + '},{lat:' + destination.lat + ',lng:' + destination.lng + '} );">arah</button></div>' );
export const map_setting = position => ({
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
export const map_style = [
	{
		elementType: 'geometry',
		stylers: [
			{
				color: "#f2f2f2"
			}
		]
	}, {
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: "#fff"
			}
		]
	}, {
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: "#333333"
			}
		]
	}, {
		featureType: 'poi',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	}, {
		featureType: 'poi',
		elementType: 'labels.text.fill',
		stylers: [
			{
				visibility: 'off'
			}
		]
	}, {
		featureType: 'road',
		elementType: 'geometry',
		stylers: [
			{
				color: "#ffffff"
			}
		]
	}, {
		featureType: 'road',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: "#e6e6e6"
			}
		]
	}, {
		featureType: 'road',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: "#bfbfbf"
			}
		]
	}, {
		featureType: 'road.highway',
		elementType: 'geometry',
		stylers: [
			{
				color: "#ffffff"
			}
		]
	}, {
		featureType: 'road.highway',
		elementType: 'geometry.stroke',
		stylers: [
			{
				color: "#d9d9d9"
			}
		]
	}, {
		featureType: 'road.highway',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: "#737373"
			}
		]
	}, {
		featureType: 'transit',
		elementType: 'labels.icon',
		stylers: [
			{
				visibility: 'off'
			}
		]
	}, {
		featureType: 'water',
		elementType: 'geometry',
		stylers: [
			{
				color: "#b3e6ff"
			}
		]
	}, {
		featureType: 'water',
		elementType: 'labels.text.fill',
		stylers: [
			{
				color: "#0077b3"
			}
		]
	}, {
		featureType: 'water',
		elementType: 'labels.text.stroke',
		stylers: [
			{
				color: "#0099e6"
			}
		]
	}
];