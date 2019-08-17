import { GOOGLE_MAP_API_KEY } from "../config/config";
const src = [
	{
		src: "https://rawcdn.githack.com/adhemukhlis/react-map-sample/d8844001ba8859fe6eca5871575da561ead82536/src/js/exclude.min.js",
		load: 'defer'
	}, {
		src: "https://maps.googleapis.com/maps/api/js?key="+GOOGLE_MAP_API_KEY,
		load: 'async'
	}
];
export const mounting_script =()=>{
        src.map(x=>load_script(x.src, x.load))
}
const load_script = ( src, load ) => {
	const _script = document.createElement( "script" );
	_script.src = src;
	_script.async = load==='async'?true:false;
	_script.defer = load==='defer'?true:false;
	document
		.body
		.appendChild( _script )
}