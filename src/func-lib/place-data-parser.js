export const place_data_parser = ( arr ) => {
	let places = [ ];
	arr.forEach(element => {
		let tmp = {
			coord: {
				lat: parseFloat( element.lat ),
				lng: parseFloat( element.lng )
			},
			label: element.label,
			place_type: element.place_type,
			verified: element.verified
		};
		places.push( tmp )
	});
	return places
}