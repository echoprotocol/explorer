import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import echo from 'echojs-lib';
import Media from 'react-media';
import Slider from 'react-slick';
import classnames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Map } from 'immutable';
import { withRouter } from 'react-router';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

import { CONTRACT_TABS, CHANGE_TEXT_TIME } from '../../constants/ContractConstants';
import {
	CONTRACT_BALANCES,
	CONTRACT_BYTECODE,
	CONTRACT_TRANSACTIONS,
	CONTRACT_DETAILS_NUMBERS_TAB,
	CONTRACT_SOURCE_CODE,
	CONTRACT_ABI,
} from '../../constants/RouterConstants';

import ContractBytecode from './ContractBytecode';
import AssetBalances from '../Account/AssetBalances';
import OperationsTable from '../TransactionInfo/OperationsTable';
import Loader from '../Loader';
import Verify from '../VerifyButton';
import manageIcon from '../../assets/images/icons/pencil.svg';
import ContractStar from './ContractStar';
import ContractAbi from './ContractAbi';
import ContractSourceCode from './ContractSourceCode';
import ContractInfo from './ContractInfo';
import { ContractIcon } from './ContractIcon';
// import { BridgeService } from '../../services/BridgeService';
import { subscribeContractHistoryUpdate } from '../../services/subscriptions/contract';

import URLHelper from '../../helpers/URLHelper';
import ContractActions from '../../actions/ContractActions';

class Contract extends React.Component {

	constructor(props) {
		super(props);
		this.updateHistorySubscriber = null;
		this.subscriber = this.updateInfo.bind(this);
		this.slider = React.createRef();
		this.manageContract = this.manageContract.bind(this);
		this.state = {
			text: 'Copy code',
		};
	}

	componentDidMount() {
		const { match: { params: { detail, id } } } = this.props;
		window.addEventListener('resize', this.listener);

		const { verified } = this.props;

		if (this.props.location.search) {
			this.props.history.push(this.props.location.pathname);
		}

		if (!verified && detail === CONTRACT_SOURCE_CODE) {
			this.props.history.push(URLHelper.createContractUrl(id));
		}

		if (!this.props.blockNumber) {
			this.initContract();
		}
		if (window.innerWidth > 400) {
			this.slider.current.slickGoTo(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0);
		}
	}

	async componentDidUpdate(prevProps) {
		if (this.props.connected && !prevProps.connected) {
			this.props.loadActiveAccount();
			this.subscribe(this.props.match.params.id).catch((err) => {
				console.log(`Error to update contract info: ${err}`);
			});
		}
		if (!prevProps.blockNumber ||
			(prevProps.connected && prevProps.match.params.id !== this.props.match.params.id)) {
			this.initContract();
		}
	}

	componentWillUnmount() {
		this.props.clearContractInfo();
		this.unsubscribe();
	}

	onLoadMoreHistory() {
		this.props.loadContractHistory(this.props.contractHistory.last().id.split('.')[2]);
	}

	async initContract() {
		const { id } = this.props.match.params;

		await this.props.getContractInfo();

		echo.subscriber.removeContractSubscribe(this.subscriber);
		echo.subscriber.setContractSubscribe([id], this.subscriber);
	}


	updateInfo() {
		const { contractHistory, loading } = this.props;
		const first = contractHistory.first();

		if (loading) { return; }
		this.props.updateContractInfo(first ? first[0].id : first);
	}

	changeTab(id, index) {

		this.props.history.push(URLHelper.createContractUrl(id, CONTRACT_TABS[index].path));
	}
	goToSlide(e, slide) {
		this.slider.current.slickGoTo(slide);
	}

	async manageContract() {
		const { match: { params: { id } } } = this.props;
		this.props.history.push(URLHelper.createManageContractUrl(id));
	}

	async subscribe(id) {
		// BridgeService.subscribeSwitchAccount(this.props.setActiveAccount);
		const updateHistory = await subscribeContractHistoryUpdate(id);

		const nextUpdate = ({ data: { contractHistoryUpdated } }) => this.props.updateContractHistory(contractHistoryUpdated);

		this.updateHistorySubscriber = updateHistory.subscribe({
			next: nextUpdate.bind(this),
			error: (err) => { console.log('Update token error: ', err.message || err); },
		});
	}

	unsubscribe() {
		// BridgeService.unsubscribeSwitchAccount(this.props.setActiveAccount);
		echo.subscriber.removeContractSubscribe(this.subscriber);
		if (this.updateHistorySubscriber) {
			this.updateHistorySubscriber.unsubscribe();
			this.updateHistorySubscriber = null;
		}
	}

	changeButtonText(bytecode) {
		copy(bytecode);
		this.setState({ text: 'Copied!' });
		setTimeout(() => this.setState({ text: 'Copy code' }), CHANGE_TEXT_TIME);
	}

	renderArrow({ text, className }) {
		return (
			<div className={className}>
				{text}
			</div>);
	}

	renderMenu(navList, selected) {

		const MenuItem = ({ text }) => (
			<div className={`menu-item-old ${text.key === `panel-${selected}` ? 'active' : ''}`}>
				{text.name}
			</div>
		);

		return navList.map((el) => {
			const { name, key } = el;
			return <MenuItem text={{ name, key }} key={key} />;
		});
	}

	renderTabs(tabList, selected) {
		const elment = tabList.map((el) => {
			const { tab, key } = el;
			return key === `tab-${selected}` &&
				<div key={key} className="tab-item">
					{tab}
				</div>;
		});
		return elment[selected];
	}

	renderMeta() {
		const {
			icon, description, name, match: { params: { id } },
		} = this.props;

		return (
			<Helmet>
				<title>Contract {name || id} | Echo Explorer</title>
				<meta property="og:description" name={description || 'ECHO contract page'} />
				<meta property="og:image" content={URLHelper.getUrlContractIcon(icon)} />
			</Helmet>
		);
	}

	render() {
		const {
			loading, isFullHistory, loadingMoreHistory,
			bytecode, contractHistory, balances, match: { params: { id, detail } }, abi, sourceCode, icon,
			name, verified, stars, description, createdAt, blockNumber, creationFee,
			type, contractTxs, countUsedByAccount, supportedAsset, ethAccuracy, compilerVersion, owner,
			error, isMobileDevice,
		} = this.props;

		const tabList = [
			{
				tab: !loading ?
					<ContractInfo
						dataGeneral={new Map({
							isMobileDevice,
							error,
							blockNumber,
							creationFee,
							type,
							contractTxs,
							countUsedByAccount,
							supportedAsset,
							ethAccuracy,
							compilerVersion,
						})}
						dataDescription={new Map({
							error,
							description,
							createdAt,
							owner,
						})}
						dataAssets={new Map({
							balances,
							isMobileDevice,
						})}
					/>
					: <Loader />,
				key: 'tab-0',
			},
			{
				tab: !loading ?
					<OperationsTable
						operations={contractHistory}
						history={this.props.history}
						location={this.props.location}
						loading={loadingMoreHistory}
						loadMore={contractHistory.size && !isFullHistory ? () => this.onLoadMoreHistory() : null}
						hasMore={!isFullHistory}
						timestamp
					/> : <Loader />,
				key: 'tab-1',
			},
			{
				tab: !loading ?
					<ContractBytecode bytecode={bytecode} /> : <Loader />,
				key: 'tab-2',
			},
			{
				tab: !loading ?
					<div className="contract-asset-panel">
						<AssetBalances title="assets" balances={balances} />
					</div> : <Loader />,
				key: 'tab-3',
			},
			{
				tab: !loading ?
					<ContractAbi id={id} abi={abi} verified={verified} /> : <Loader />,
				key: 'tab-4',
			},
		];
		if (verified) {
			tabList.push({
				tab: !loading ?
					<ContractSourceCode sourceCode={sourceCode} /> : <Loader />,
				key: 'tab-5',
			});
		}

		const settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: tabList.length,
			slidesToScroll: 1,
			variableWidth: true,
			touchMove: false,
			initialSlide: CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0,
			responsive: [
				{
					defaultMatches: isMobileDevice,
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
					},
				},
			],
		};

		return (
			<div className="table-container inner-information-container account-page contract-page with-d-table">
				{this.renderMeta()}
				<div className="react-tabs">
					<div className="tab-head">
						<div className="backwards action">
							<div className="account-page-t-block">
								<Media query="(max-width: 380px)" defaultMatches={this.props.isMobileDevice}>
									{(matches) =>
										!matches &&
										<div className="ava">
											<ContractIcon icon={icon} />
										</div>
									}
								</Media>
								<div className="title">Contract {id} {name && `:  ${name}`}</div>
								<button className="copy-bytecode"	onClick={() => this.changeButtonText(bytecode)}>
									{this.state.text}
								</button>
							</div>
						</div>
						<div className="buttons-wrap">
							<div className="item">
								<ContractStar
									stars={stars}
									setStarToContract={this.props.setStarToContract}
								/>
							</div>
							<div className="item">
								<div className="action-button-wrap">
									<button className="action-button" onClick={this.manageContract}>
										<img src={manageIcon} alt="" />
										<span className="content">Manage</span>
									</button>
								</div>
							</div>
							<div className="item">
								<Verify id={id} verified={verified} />
							</div>
						</div>
						<Media query="(max-width: 400px)" defaultMatches={this.props.isMobileDevice}>
							{(matches) =>
								(!matches ?
									<div className={classnames('horizontal-tab-panel', { 'server-slick-track': __IS_SERVER__ })}>
										<Slider ref={this.slider} {...settings} >
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 })}>
												<Link
													className="menu-item-content"
													onClick={() => this.goToSlide(0)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 ? -1 : null}
													to={URLHelper.createContractUrl(id)}
												>
													<span className="menu-item-content">Contract info</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 })}>
												<Link
													onClick={() => this.goToSlide(1)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 ? -1 : null}
													to={URLHelper.createContractUrl(id, CONTRACT_TRANSACTIONS)}
												>
													<span className="menu-item-content">{`Operations (${contractTxs})`}</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 })}>
												<Link
													onClick={() => this.goToSlide(2)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 ? -1 : null}
													to={URLHelper.createContractUrl(id, CONTRACT_BYTECODE)}
												>
													<span className="menu-item-content">Byte Сode</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 4 })}>
												<Link
													onClick={() => this.goToSlide(4)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 4 ? -1 : null}
													to={URLHelper.createContractUrl(id, CONTRACT_ABI)}
												>
													<span className="menu-item-content">ABI</span>
												</Link>
											</div>
											{
												verified &&
												<div
													className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 5 })}
												>
													<Link
														onClick={() => this.goToSlide(5)}
														tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 5 ? -1 : null}
														to={URLHelper.createContractUrl(id, CONTRACT_SOURCE_CODE)}
													>
														<span className="menu-item-content">Source code</span>
													</Link>
												</div>
											}
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 3 })}>
												<Link
													onClick={() => this.goToSlide(3)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 3 ? -1 : null}
													to={URLHelper.createContractUrl(id, CONTRACT_BALANCES)}
												>
													<span className="menu-item-content">Balances</span>
												</Link>
											</div>
										</Slider>
									</div> :
									<Dropdown className="dropdown-tab">
										<Dropdown.Toggle variant="Info">
											<span className="doropdown-tab-current">
												{
													CONTRACT_TABS[CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0].title
												}
											</span>
											<span className="carret" />
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<PerfectScrollbar className="contract-tab-scroll">
												<Dropdown.Item onClick={() => this.changeTab(id, 0)} eventKey={0}>
													<span className="doropdown-tab-item">Contract info</span>
												</Dropdown.Item>
												<Dropdown.Item onClick={() => this.changeTab(id, 1)} eventKey={1}>
													<span className="doropdown-tab-item">{`Transactions (${contractTxs})`}</span>
												</Dropdown.Item>
												<Dropdown.Item onClick={() => this.changeTab(id, 2)} eventKey={2}>
													<span className="doropdown-tab-item">Bytecode</span>
												</Dropdown.Item>
												<Dropdown.Item onClick={() => this.changeTab(id, 3)} eventKey={3}>
													<span className="doropdown-tab-item">Balances</span>
												</Dropdown.Item>
												<Dropdown.Item onClick={() => this.changeTab(id, 4)} eventKey={4}>
													<span className="doropdown-tab-item">ABI</span>
												</Dropdown.Item>
											</PerfectScrollbar>
										</Dropdown.Menu>
									</Dropdown>
								)
							}
						</Media>

					</div>
					<div className="tab-body">
						{
							this.renderTabs(tabList, CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0)
						}
					</div>
				</div>
			</div>
		);
	}

}

export function loadData(store, data) {
	if (!data.params || !data.params.id) {
		return null;
	}
	return store.dispatch(ContractActions.getContractInfo(data.params.id));
}


Contract.propTypes = {
	isMobileDevice: PropTypes.bool.isRequired,
	connected: PropTypes.bool.isRequired,
	error: PropTypes.string,
	loading: PropTypes.bool,
	isFullHistory: PropTypes.bool,
	loadingMoreHistory: PropTypes.bool,
	bytecode: PropTypes.string,
	history: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	contractHistory: PropTypes.object.isRequired,
	balances: PropTypes.object.isRequired,
	match: PropTypes.object.isRequired,
	getContractInfo: PropTypes.func.isRequired,
	clearContractInfo: PropTypes.func.isRequired,
	loadContractHistory: PropTypes.func.isRequired,
	updateContractInfo: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	setStarToContract: PropTypes.func.isRequired,
	setActiveAccount: PropTypes.func.isRequired,
	loadActiveAccount: PropTypes.func.isRequired,

	registrar: PropTypes.string.isRequired,
	blockNumber: PropTypes.number.isRequired,
	countUsedByAccount: PropTypes.number.isRequired,
	supportedAsset: PropTypes.string,
	ethAccuracy: PropTypes.bool.isRequired,
	contractTxs: PropTypes.number.isRequired,
	creationFee: PropTypes.object.isRequired,
	createdAt: PropTypes.string.isRequired,
	type: PropTypes.object.isRequired,

	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	icon: PropTypes.string.isRequired,
	sourceCode: PropTypes.string,
	abi: PropTypes.string.isRequired,
	compilerVersion: PropTypes.string.isRequired,
	verified: PropTypes.bool.isRequired,
	stars: PropTypes.object.isRequired,

	owner: PropTypes.object.isRequired,
	updateContractHistory: PropTypes.func.isRequired,
};

Contract.defaultProps = {
	error: '',
	loading: false,
	isFullHistory: false,
	loadingMoreHistory: false,
	bytecode: null,
	sourceCode: null,
	supportedAsset: '',
};

export default withRouter(Contract);
