import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import echo from 'echojs-lib';
import Media from 'react-media';
import Slider from 'react-slick';
import classnames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Map } from 'immutable';
import copy from 'copy-to-clipboard';
import { Helmet } from 'react-helmet';

import { CONTRACT_TABS, CHANGE_TEXT_TIME } from '../../constants/ContractConstants';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import {
	CONTRACT_BALANCES,
	CONTRACT_BYTECODE,
	CONTRACT_TRANSACTIONS,
	CONTRACT_DETAILS_NUMBERS_TAB,
	CONTRACT_SOURCE_CODE,
	CONTRACT_ABI,
	SSR_CONTRACT_PATH,
	SSR_MANAGE_CONTRACT_PATH,
	SSR_CONTRACT_DETAILS_PATH,
} from '../../constants/RouterConstants';

import ContractBytecode from './ContractBytecode';
import AssetBalances from '../Account/AssetBalances';
import Loader from '../Loader';
import Verify from '../VerifyButton';
import manageIcon from '../../public/images/icons/pencil.svg';
import ContractStar from './ContractStar';
import ContractAbi from './ContractAbi';
import ContractSourceCode from './ContractSourceCode';
import ContractInfo from './ContractInfo';
import { ContractIcon } from './ContractIcon';
// import { BridgeService } from '../../services/BridgeService';
import { subscribeContractHistoryUpdate } from '../../services/subscriptions/contract';

import URLHelper from '../../helpers/URLHelper';
import OperationsTable from '../../containers/OperationsTable';
import { CONTRACT_GRID } from '../../constants/TableConstants';
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

	async componentDidMount() {
		const { router: { query: { detail, id } } } = this.props;
		window.addEventListener('resize', this.listener);
		await this.initContract();
		const { verified } = this.props;

		if (!verified && detail === CONTRACT_SOURCE_CODE) {
			Router.push(SSR_CONTRACT_PATH, URLHelper.createContractUrl(id));
		}

		this.props.loadActiveAccount();

		if (window.innerWidth > 400) {
			this.slider.current.slickGoTo(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0);
		}
		this.subscribe(id);
	}


	componentDidUpdate(prevProps) {
		if (prevProps.router.query.id && prevProps.router.query.id !== this.props.router.query.id) {
			this.initContract();
		}
	}

	componentWillUnmount() {
		this.props.clearContractInfo();
		this.unsubscribe();
	}

	onLoadMoreHistory() {
		this.props.loadContractHistory(this.props.router.query.id);
	}

	async initContract() {
		const { query: { id } } = this.props.router;
		this.props.setTitle(TITLE_TEMPLATES.CONTRACT.replace(/id/, id));
		if (echo.isConnected) {
			await this.props.getContractInfo(id);
			echo.subscriber.removeContractSubscribe(this.subscriber);
			echo.subscriber.setContractSubscribe([id], this.subscriber);
		}
	}


	updateInfo() {
		const { loading, router: { query: { id } } } = this.props;
		if (loading) { return; }
		this.props.updateContractInfo(id);
	}

	changeTab(id, index) {
		Router.push(SSR_CONTRACT_PATH, URLHelper.createContractUrl(id, CONTRACT_TABS[index].path));
	}

	goToSlide(e, slide) {
		this.slider.current.slickGoTo(slide);
	}

	async manageContract() {
		Router.push(SSR_MANAGE_CONTRACT_PATH, URLHelper.createManageContractUrl(this.props.router.query.id));
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
			icon, description, name, router: { query: { id } },
		} = this.props;

		return (
			<Helmet
				title={`Contract ${name || id} | Echo Explorer`}
				meta={[
					{ property: 'og:description', name: description || 'ECHO contract page' },
					{ property: 'og:image', content: URLHelper.getUrlContractIcon(icon) },
				]}
			/>
		);
	}

	render() {
		const {
			loading, loadingMoreHistory,
			bytecode, contractHistory, balances, router: { query: { id, detail } }, abi, sourceCode, icon,
			name, verified, stars, description, createdAt, blockNumber, creationFee,
			type, contractTxs, countUsedByAccount, supportedAsset, ethAccuracy, compilerVersion, owner, token,
			countTokenTransfer, activeAccount, error, isMobile,
		} = this.props;

		const tabList = [
			{
				tab: !loading ?
					<ContractInfo
						dataGeneral={new Map({
							isMobile,
							token,
							countTokenTransfer,
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
							isMobile,
							balances,
						})}
					/>
					: <Loader />,
				key: 'tab-0',
			},
			{
				tab: !loading ?
					<OperationsTable
						onLoadMoreHistory={() => this.onLoadMoreHistory()}
						gridName={CONTRACT_GRID}
						operations={contractHistory}
						router={this.props.router}
						loading={loadingMoreHistory}
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
			<div className="inner-information-container contract-page">
				{this.renderMeta()}
				<div className="react-tabs">
					<div className="tab-head">
						<div className="backwards action">
							<div className="account-page-t-block">
								<Media query="(max-width: 380px)" defaultMatches={isMobile}>
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
						<Media query="(max-width: 400px)" defaultMatches={isMobile}>
							{(matches) =>
								(!matches ?
									<div className={classnames('horizontal-tab-panel', { 'server-slick-track': typeof window === 'undefined' })}>
										<Slider ref={this.slider} {...settings} >
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 })}>
												<Link href={SSR_CONTRACT_PATH} as={URLHelper.createContractUrl(id)}>
													<a href="" onClick={(e) => this.goToSlide(e, 0)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 ? -1 : null} >
														<span className="menu-item-content">Contract info</span>
													</a>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 })}>
												<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_TRANSACTIONS)}>
													<a href="" onClick={(e) => this.goToSlide(e, 1)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 ? -1 : null}>
														<span className="menu-item-content">{`Operations (${contractTxs})`}</span>
													</a>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 })}>
												<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_BYTECODE)}>
													<a href="" onClick={(e) => this.goToSlide(e, 2)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 ? -1 : null}>
														<span className="menu-item-content">Byte Сode</span>
													</a>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 4 })}>
												<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_ABI)}>
													<a href="" onClick={(e) => this.goToSlide(e, 4)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 4 ? -1 : null}>
														<span className="menu-item-content">ABI</span>
													</a>
												</Link>
											</div>
											{
												verified &&
												<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 5 })}>
													<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_SOURCE_CODE)}>
														<a href="" onClick={(e) => this.goToSlide(e, 5)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 5 ? -1 : null}>
															<span className="menu-item-content">Source code</span>
														</a>
													</Link>
												</div>
											}
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 3 })}>
												<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_BALANCES)}>
													<a href="" onClick={(e) => this.goToSlide(e, 3)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 3 ? -1 : null}>
														<span className="menu-item-content">Balances</span>
													</a>
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

Contract.propTypes = {
	isMobile: PropTypes.bool.isRequired,
	error: PropTypes.string,
	loading: PropTypes.bool,
	loadingMoreHistory: PropTypes.bool,
	bytecode: PropTypes.string,
	router: PropTypes.object.isRequired,
	contractHistory: PropTypes.object.isRequired,
	balances: PropTypes.object.isRequired,
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
	token: PropTypes.object,
	countTokenTransfer: PropTypes.number.isRequired,

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
	error: '',
	loading: false,
	loadingMoreHistory: false,
	bytecode: null,
	sourceCode: null,
	supportedAsset: '',
	activeAccount: new Map(),
	token: null,
};

Contract.getInitialProps = async ({ query, store }) => {
	await store.dispatch(ContractActions.getContractInfo(query.id));
	return {};
};

export default withRouter(Contract);
