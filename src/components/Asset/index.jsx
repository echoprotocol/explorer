import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';

import Loader from '../Loader';
import InnerHeader from '../InnerHeader';
import InfoBlock from '../InfoBlock';
import InfoBlockItem from '../InfoBlock/InfoBlockItem';

import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';

import URLHelper from '../../helpers/URLHelper';
import { getFullAssetInformation, getAssetTransfers } from '../../actions/AssetActions';
import { SSR_ACCOUNTS_PATH } from '../../constants/RouterConstants';
import GlobalActions from '../../actions/GlobalActions';
import GridActions from '../../actions/GridActions';
import { ASSET_GRID } from '../../constants/TableConstants';
import AssetTransfersTable from './AssetTransferTable';

class Asset extends React.Component {

	constructor() {
		super();
		this.state = {
			asset: null,
			issuer: null,
		};
	}

	static getDerivedStateFromProps(nextProps, state) {
		if (nextProps.asset && nextProps.asset !== state.asset) {
			return {
				asset: fromJS(nextProps.asset),
				issuer: fromJS(nextProps.issuer),
			};
		}
		return null;
	}

	componentDidMount() {
		if (!this.state.asset) {
			this.updateAssetData(this.props.router.query.id);
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.router.query.id !== this.props.router.query.id) {
			this.updateAssetData(this.props.router.query.id);
		}
	}

	onLoadMoreHistory() {
		this.props.loadAssetHisotry(this.props.router.query.id);
	}

	updateAssetData(id) {
		this.props.getAssetInfo(id)
			.then(({ asset, issuer }) => {
				this.setState({
					asset: fromJS(asset),
					issuer: fromJS(issuer),
				});
				this.props.setTitle(TITLE_TEMPLATES.ASSET.replace(/name/, asset.symbol));
			});
	}

	render() {
		const { asset, issuer } = this.state;
		const {
			filterAndPaginateData, initData,
			assetTransfers, router,
		} = this.props;
		const assetSymbol = asset && asset.get('symbol');
		const issuerName = issuer && issuer.get('name');
		const assetPrecision = asset && asset.get('precision');
		const currentSupply = asset && asset.getIn(['dynamic', 'current_supply']);
		const maxSupply = asset && asset.getIn(['options', 'max_supply']);
		const isbitAsset = asset && !!asset.get('bitasset_data_id');
		const assetFlags = asset && asset.getIn(['options', 'flags']);
		return (
			<div className="inner-container indent-lg">
				{(asset === null && issuer === null) ?
					<Loader /> :
					<React.Fragment>
						<InnerHeader title={`Asset: ${assetSymbol}`} className="committee-members" />
						<InfoBlock settings={assetFlags && assetFlags.toJS()}>
							<InfoBlockItem
								title="Issuer"
								value={issuerName}
								isLink
								href={SSR_ACCOUNTS_PATH}
								as={URLHelper.createAccountUrl(issuerName)}
								className="issuer"
							/>
							<InfoBlockItem title="Precision" value={`${assetPrecision}`} className="precision" />
							<InfoBlockItem title="Current supply" value={currentSupply} className="current-supply" />
							<InfoBlockItem title="Max supply" value={maxSupply} className="max-supply" />
							<InfoBlockItem title="Bit asset" value={isbitAsset ? 'yes' : 'no'} className="bit-asset" />
						</InfoBlock>
						<AssetTransfersTable
							label="Asset transfers"
							assetTransfers={assetTransfers}
							onLoadMoreHistory={() => this.onLoadMoreHistory()}
							initData={initData}
							filterAndPaginateData={filterAndPaginateData}
							router={router}
						/>
					</React.Fragment>
				}
			</div>
		);
	}

}

Asset.propTypes = {
	router: PropTypes.object.isRequired,
	getAssetInfo: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	assetTransfers: PropTypes.object,
	filterAndPaginateData: PropTypes.object.isRequired,
	initData: PropTypes.func.isRequired,
	loadAssetHisotry: PropTypes.func.isRequired,
};

Asset.defaultProps = {
	assetTransfers: {},
};

Asset.getInitialProps = async ({ query: { id: assetId, ...filters }, store }) => {
	const { asset, issuer } = await store.dispatch(getFullAssetInformation(assetId));
	await store.dispatch(getAssetTransfers(assetId));
	await store.dispatch(GridActions.initData(ASSET_GRID, filters));
	const title = TITLE_TEMPLATES.ASSET.replace(/name/, asset.symbol);
	await store.dispatch(GlobalActions.setTitle(title));
	return { asset, issuer };
};

export default Asset;
