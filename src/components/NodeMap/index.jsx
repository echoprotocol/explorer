import React from 'react';
import Media from 'react-media';
import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';
import PropTypes from 'prop-types';

import config from '../../config/chain';

const Map = ReactMapboxGl({
	accessToken: config.MAP_API_TOKEN,
});
const zoom = [1];
class NodeMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			popupData: null,
			data: [],
		};
	}

	componentDidMount() {
		this.props.getPeers(true);
	}

	static getDerivedStateFromProps(props) {

		const data = props.peers.map((p, i) => ({
			id: i.toString(),
			city: p.city,
			country: p.country,
			latitude: p.ll[0],
			longitude: p.ll[1],
			node: p.node,
			POSITION_CIRCLE_PAINT: {
				'circle-stroke-width': 0,
				'circle-radius': 10,
				'circle-blur': 0.15,
				'circle-stroke-color': 'white',
				'circle-color': '#4588D7',
			},
		}));
		return { data };
	}

	onHover(mapWithEvt, p) {

		mapWithEvt.map.setPaintProperty(p.id, 'circle-color', '#1B1B21');
		mapWithEvt.map.setPaintProperty(p.id, 'circle-stroke-width', 3);
		this.showPopup(p);
	}
	showPopup(popupData) {
		this.setState({ popupData });
	}
	hidePopup(mapWithEvt, p) {
		mapWithEvt.map.setPaintProperty(p.id, 'circle-color', '#4588D7');
		mapWithEvt.map.setPaintProperty(p.id, 'circle-stroke-width', 0);
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
					{data.map((p, key) => (
						<Layer
							type="circle"
							id={p.id}
							key={key.toString()}
							paint={p.POSITION_CIRCLE_PAINT}
						>
							<Feature
								coordinates={[p.longitude, p.latitude]}
								onMouseEnter={(mapWithEvt) => this.onHover(mapWithEvt, p)}
								onMouseLeave={(mapWithEvt) => this.hidePopup(mapWithEvt, p)}
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
							<span>{popupData.city}{popupData.city ? ', ' : ' '}{popupData.country}</span>
							<br />
							<span>count = {popupData.node}</span>
						</Popup>
					}
				</Map>
			</div>
		);
	}

}

NodeMap.propTypes = {
	getPeers: PropTypes.func.isRequired,
};

export default NodeMap;
