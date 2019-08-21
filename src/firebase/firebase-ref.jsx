import firebase from 'firebase/app';
import 'firebase/database';
import { GOOGLE_FIREBASE_API_CONFIG } from "../config/config";
firebase.initializeApp( GOOGLE_FIREBASE_API_CONFIG );
export const rootRef = firebase
	.database( )
	.ref( );
export const places_data = rootRef.child( 'places' );
export const get_places = ( func , place_type, done) => places_data.orderByChild("place_type").equalTo(place_type).once('value', snap => {
	let tmp = [ ];
	snap.forEach(shot => {
		tmp.push({
			id: shot.key,
			...shot.val( )
		})
	});
	func( tmp );
	done()
});