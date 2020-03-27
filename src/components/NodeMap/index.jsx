import React from 'react';
import PropTypes from 'prop-types';

import config from '../../config/chain';
import { DEFAULT_MAP_ZOOM } from '../../constants/NetworkConstants';
import NetworkActions from '../../actions/NetworkActions';

let ReactMapboxGl = null;
let Map = null;

if (__IS_CLIENT__) {
	/* eslint-disable global-require */
	ReactMapboxGl = require('react-mapbox-gl');
	/* eslint-enable global-require */
	Map = ReactMapboxGl.default({
		accessToken: config.MAP_API_TOKEN,
	});
}

class NodeMap extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			popupData: null,
		};
	}

	componentDidMount() {
		if (this.props.peers.length > 0) {
			return;
		}
		this.props.getPeers(true);
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

	handlePeers() {
		const { peers } = this.props;
		const getCircleRadius = (nodeCount) => {
			if (nodeCount > 1) {
				return 11;
			} else if (nodeCount > 10) {
				return 13;
			} else if (nodeCount > 20) {
				return 17;
			}
			return 8;
		};

		const data = peers.map((p, i) => ({
			id: i.toString(),
			city: p.city,
			country: p.country,
			latitude: p.ll[0],
			longitude: p.ll[1],
			node: p.node,
			POSITION_CIRCLE_PAINT: {
				'circle-stroke-width': 0,
				'circle-radius': getCircleRadius(p.node),
				'circle-blur': 0.15,
				'circle-stroke-color': 'white',
				'circle-color': '#4588D7',
			},
		}));
		return data;
	}

	render() {
		const { popupData } = this.state;
		const data = this.handlePeers();

		return (
			<div className="distribution inner-information-container">
				<div className="distribution-header">
					<h1>Nodes Distribution</h1>
					<button onClick={(() => window.open(config.INSTALL_NODE_LINK, '_blank'))} >
						How to run full node
					</button>
				</div>
				{Map && (
					<Map
						className="distribution-map"
						// eslint-disable-next-line react/style-prop-object
						style="mapbox://styles/maxshev/ck2lyn9ua0bv61cp7598loxiq"
						zoom={DEFAULT_MAP_ZOOM}
					>
						{data.map((p, key) => (
							<ReactMapboxGl.Layer
								type="circle"
								id={p.id}
								key={key.toString()}
								paint={p.POSITION_CIRCLE_PAINT}
							>
								<ReactMapboxGl.Feature
									coordinates={[p.longitude, p.latitude]}
									onMouseEnter={(mapWithEvt) => this.onHover(mapWithEvt, p)}
									onMouseLeave={(mapWithEvt) => this.hidePopup(mapWithEvt, p)}
								/>
							</ReactMapboxGl.Layer>
						))}
						{popupData &&
							<ReactMapboxGl.Popup
								coordinates={[popupData.longitude, popupData.latitude]}
								anchor="null"
							>
								<span>{popupData.city}{popupData.city ? ', ' : ' '}{popupData.country}</span>
								<br />
								<span>count = {popupData.node}</span>
							</ReactMapboxGl.Popup>
						}
					</Map>
				)}
			</div>
		);
	}

}

export function loadData(store) {
	return store.dispatch(NetworkActions.getPeers(true));
}

NodeMap.propTypes = {
	peers: PropTypes.array,
	getPeers: PropTypes.func.isRequired,
};

NodeMap.defaultProps = {
	peers: [],
};

export default NodeMap;
