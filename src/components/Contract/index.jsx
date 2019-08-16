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

import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
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
import TransactionsTable from '../BlockInformation/TransactionsTable';
import Loader from '../Loader';
import Verify from '../VerifyButton';
import manageIcon from '../../assets/images/icons/pencil.svg';
import ContractStar from './ContractStar';
import ContractAbi from './ContractAbi';
import ContractSourceCode from './ContractSourceCode';
import ContractInfo from './ContractInfo';
import { ContractIcon } from './ContractIcon';
import { BridgeService } from '../../services/BridgeService';
import { subscribeContractHistoryUpdate } from '../../services/subscriptions/contract';

import URLHelper from '../../helpers/URLHelper';

class Contract extends React.Component {

	constructor(props) {
		super(props);
		this.updateHistorySubscriber = null;
		this.subscriber = this.updateInfo.bind(this);
		this.slider = React.createRef();
		this.manageContract = this.manageContract.bind(this);
	}


	async componentDidMount() {
		const { match: { params: { detail, id } } } = this.props;
		window.addEventListener('resize', this.listener);
		await this.initContract();
		const { verified } = this.props;

		if (!verified && detail === CONTRACT_SOURCE_CODE) {
			this.props.history.push(URLHelper.createContractUrl(id));
		}

		this.props.loadActiveAccount();

		if (window.innerWidth > 400) {
			this.slider.current.slickGoTo(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0);
		}
		this.subscribe(id);
	}


	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.initContract();
		}
	}

	componentWillUnmount() {
		this.props.clearContractInfo();
		this.unsubscribe();
	}

	onLoadMoreHistory() {
		this.props.loadContractHistory(this.props.contractHistory.last()[0].id.split('.')[2]);
	}

	async initContract() {
		const { id } = this.props.match.params;

		this.props.setTitle(TITLE_TEMPLATES.CONTRACT.replace(/id/, id));
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

	goToSlide(e, slide) {
		this.slider.current.slickGoTo(slide);
	}

	async manageContract() {
		const { match: { params: { id } } } = this.props;
		this.props.history.push(URLHelper.createManageContractUrl(id));
	}

	async subscribe(id) {
		BridgeService.subscribeSwitchAccount(this.props.setActiveAccount);
		const updateHistory = await subscribeContractHistoryUpdate(id);

		const nextUpdate = ({ data: { contractHistoryUpdated } }) => this.props.updateContractHistory(contractHistoryUpdated);

		this.updateHistorySubscriber = updateHistory.subscribe({
			next: nextUpdate.bind(this),
			error: (err) => { console.log('Update token error: ', err.message || err); },
		});
	}

	unsubscribe() {
		BridgeService.unsubscribeSwitchAccount(this.props.setActiveAccount);
		echo.subscriber.removeContractSubscribe(this.subscriber);
		if (this.updateHistorySubscriber) {
			this.updateHistorySubscriber.unsubscribe();
			this.updateHistorySubscriber = null;
		}
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

	render() {
		const {
			loading, isFullHistory, loadingMoreHistory,
			bytecode, contractHistory, balances, match: { params: { id, detail } }, abi, sourceCode, icon,
			name, verified, stars, description, createdAt, blockNumber, creationFee,
			type, contractTxs, countUsedByAccount, supportedAsset, ethAccuracy, compilerVersion, owner,
			activeAccount,
		} = this.props;

		const tabList = [
			{
				tab: !loading ?
					<ContractInfo
						dataGeneral={new Map({
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
							description,
							createdAt,
							owner,
						})}
						dataAssets={new Map({
							balances,
						})}
					/> : <Loader />,
				key: 'tab-0',
			},
			{
				tab: !loading ?
					<TransactionsTable
						transactions={contractHistory}
						loading={loadingMoreHistory}
						loadMore={contractHistory.size && !isFullHistory ? () => this.onLoadMoreHistory() : null}
						hasMore={!isFullHistory}
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
				<div className="react-tabs">
					<div className="tab-head">
						<div className="backwards">
							<div className="account-page-t-block">
								<Media query="(max-width: 380px)">
									{(matches) =>
										!matches &&
										<div className="ava">
											<ContractIcon icon={icon} />
										</div>
									}
								</Media>

								<div className="title">Contract {id} {name && `:  ${name}`}</div>
							</div>
						</div>
						<div className="buttons-wrap">
							<div className="item">
								<ContractStar
									stars={stars}
									activeAccount={activeAccount}
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
						<Media query="(max-width: 400px)">
							{(matches) =>
								(!matches ?
									<div className="horizontal-tab-panel">
										<Slider ref={this.slider} {...settings} >
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 })}>
												<Link
													className="menu-item-content"
													onClick={() => this.goToSlide(0)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 && -1}
													to={URLHelper.createContractUrl(id)}
												>
													<span className="menu-item-content">Contract info</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 })}>
												<Link
													onClick={() => this.goToSlide(1)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 && -1}
													to={URLHelper.createContractUrl(id, CONTRACT_TRANSACTIONS)}
												>
													<span className="menu-item-content">{`Transactions (${contractTxs})`}</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 })}>
												<Link
													onClick={() => this.goToSlide(2)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 && -1}
													to={URLHelper.createContractUrl(id, CONTRACT_BYTECODE)}
												>
													<span className="menu-item-content">Bytecode</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 3 })}>
												<Link
													onClick={() => this.goToSlide(3)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 3 && -1}
													to={URLHelper.createContractUrl(id, CONTRACT_BALANCES)}
												>
													<span className="menu-item-content">Balances</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 4 })}>
												<Link
													onClick={() => this.goToSlide(4)}
													tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 4 && -1}
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
														tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 5 && -1}
														to={URLHelper.createContractUrl(id, CONTRACT_SOURCE_CODE)}
													>
														<span className="menu-item-content">Source code</span>
													</Link>
												</div>
											}
										</Slider>
									</div> :
									<Dropdown className="dropdown-tab">
										<Dropdown.Toggle variant="Info">
											<span className="doropdown-tab-current">Contract info</span>
											<span className="carret" />
										</Dropdown.Toggle>

										<Dropdown.Menu>
											<PerfectScrollbar className="contract-tab-scroll">
												<Dropdown.Item eventKey={0}>
													<span className="doropdown-tab-item">Contract info</span>
												</Dropdown.Item>
												<Dropdown.Item eventKey={1}>
													<span className="doropdown-tab-item">{`Transactions (${contractTxs})`}</span>
												</Dropdown.Item>
												<Dropdown.Item eventKey={2}>
													<span className="doropdown-tab-item">Bytecode</span>
												</Dropdown.Item>
												<Dropdown.Item eventKey={3}>
													<span className="doropdown-tab-item">Balances</span>
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

Contract.propTypes = {
	loading: PropTypes.bool,
	isFullHistory: PropTypes.bool,
	loadingMoreHistory: PropTypes.bool,
	bytecode: PropTypes.string,
	history: PropTypes.object.isRequired,
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

	activeAccount: PropTypes.object,
	owner: PropTypes.object.isRequired,
	updateContractHistory: PropTypes.func.isRequired,
};

Contract.defaultProps = {
	loading: false,
	isFullHistory: false,
	loadingMoreHistory: false,
	bytecode: null,
	sourceCode: null,
	supportedAsset: '',
	activeAccount: new Map(),
};

export default withRouter(Contract);
