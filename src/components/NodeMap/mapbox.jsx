import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

import config from '../../config/chain';

const Map = ReactMapboxGl({
	accessToken: config.MAP_API_TOKEN,
});

export default Map;
export { Map, Layer, Feature, Popup };
