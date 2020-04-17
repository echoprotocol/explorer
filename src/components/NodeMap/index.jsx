import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

import config from '../../config/chain';
import { DEFAULT_MAP_ZOOM } from '../../constants/NetworkConstants';
import Loader from '../Loader';

const Map = dynamic(() => import('./mapbox'), {
	ssr: false,
	loading: () => <Loader />,
});

const Layer = dynamic(() => import('./mapbox').then((component) => component.Layer), {
	ssr: false,
	loading: () => <Loader />,
});
const Feature = dynamic(() => import('./mapbox').then((component) => component.Feature), {
	ssr: false,
	loading: () => <Loader />,
});
const Popup = dynamic(() => import('./mapbox').then((component) => component.Popup), {
	ssr: false,
	loading: () => <Loader />,
});

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

		const data = props.peers.map((p, i) => ({
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
			<div className="distribution inner-container">
				<div className="distribution-header">
					<h1>Nodes Distribution</h1>
					<button onClick={(() => window.open(config.INSTALL_NODE_LINK, '_blank'))} >
						How to run full node
					</button>
				</div>
				<Map
					className="distribution-map"
					// eslint-disable-next-line react/style-prop-object
					style="mapbox://styles/maxshev/ck2lyn9ua0bv61cp7598loxiq"
					zoom={DEFAULT_MAP_ZOOM}
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
					{popupData &&
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
