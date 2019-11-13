import React from 'react';
import Media from 'react-media';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';


const Map = ReactMapboxGl({
	accessToken:
      'pk.eyJ1IjoibWF4c2hldiIsImEiOiJjazJsbnByY2cwODlpM2NwZWZhZndhZjhhIn0.RF3XIqcQtY2nTT8sKYL8wA',
});
const zoom = [1];
class NodeMap extends React.Component {

	constructor() {
		super();

		this.state = {
			popupData: null,
			data: [
				{
					id: 1,
					city: 'Minsk',
					country: 'Belarus',
					latitude: '38.914581',
					longitude: '77.031706',
					node: 1,
					POSITION_CIRCLE_PAINT: {
						'circle-stroke-width': 0,
						'circle-radius': 5,
						'circle-blur': 0.15,
						'circle-stroke-color': 'white',
						'circle-color': '#4588D7',
					},
				},
				{
					id: 2,
					city: 'Brest',
					country: 'Belarus',
					latitude: '39.878241',
					longitude: '-74.020945',
					node: 2,
					POSITION_CIRCLE_PAINT: {
						'circle-stroke-width': 0,
						'circle-radius': 10,
						'circle-blur': 0.15,
						'circle-stroke-color': 'white',
						'circle-color': '#4588D7',
					},
				},
			],
		};
	}
	onHover(mapWithEvt, city) {

		mapWithEvt.map.setPaintProperty(city.city, 'circle-color', '#1B1B21');
		mapWithEvt.map.setPaintProperty(city.city, 'circle-stroke-width', 3);
		this.showPopup(city);
	}
	showPopup(popupData) {
		this.setState({ popupData });
	}
	hidePopup(mapWithEvt, city) {
		mapWithEvt.map.setPaintProperty(city.city, 'circle-color', '#4588D7');
		mapWithEvt.map.setPaintProperty(city.city, 'circle-stroke-width', 0);
		this.setState({ popupData: null });
	}

	render() {

		const {
			popupData, data,
		} = this.state;

		return (
			<div className="distribution table-container recent-block-table">
				<div className="distribution-header">
					<h1>Nodes Distribution</h1>
					<button>
						<Media query="(max-width: 499px)">
							{(matches) =>
								(matches ? (
									'How to run full node'
								) : (
									'Join Full Nodes Incentive Program'
								))
							}
						</Media>
					</button>
				</div>
				<Map
					className="distribution-map"
					// eslint-disable-next-line react/style-prop-object
					style="mapbox://styles/maxshev/ck2lyn9ua0bv61cp7598loxiq"
					zoom={zoom}
				>
					{data.map((city) => (
						<Layer
							type="circle"
							id={city.city}
							key={city.id}
							paint={city.POSITION_CIRCLE_PAINT}
						>
							<Feature
								coordinates={[city.longitude, city.latitude]}
								onMouseEnter={(mapWithEvt) => this.onHover(mapWithEvt, city)}
								onMouseLeave={(mapWithEvt) => this.hidePopup(mapWithEvt, city)}
							/>
						</Layer>
					))
					}
					{
						popupData &&
						<Popup
							coordinates={[popupData.longitude, popupData.latitude]}
							anchor="null"
						>
							<span>{popupData.city} , {popupData.country}</span>
							<br />
							<span>count = {popupData.node}</span>
						</Popup>
					}
				</Map>
			</div>
		);
	}

}

export default NodeMap;
