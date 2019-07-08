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

import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import {
	CONTRACT_BALANCES,
	CONTRACT_BYTECODE,
	CONTRACT_TRANSACTIONS,
	CONTRACT_DETAILS_NUMBERS_TAB, CONTRACT_SURCE_CODE, CONTRACT_ABI,
} from '../../constants/RouterConstants';

import ContractBytecode from './ContractBytecode';
import AssetBalances from '../Account/AssetBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';
import Loader from '../Loader';
import BackwardIcon from '../BackwardIcon';
import Verify from '../VerifyButton';
import manageIcon from '../../assets/images/icons/pencil.svg';
import ContractStar from './ContractStar';
import ContractAbi from './ContractAbi';
import ContractSourceCode from './ContractSourceCode';
import ContractInfo from './ContractInfo';
import { ContractIcon } from './ContractIcon';

import URLHelper from '../../helpers/URLHelper';
import { BridgeService } from '../../services/BridgeService';

class Contract extends React.Component {

	constructor(props) {
		super(props);
		this.subscriber = this.updateInfo.bind(this);
		this.slider = React.createRef();
	}

	componentDidMount() {
		const { match: { params: { detail } } } = this.props;
		window.addEventListener('resize', this.listener);
		this.initContract();

		this.props.loadActiveAccount();
		BridgeService.subscribeSwitchAccount(this.props.setActiveAccount);

		if (window.innerWidth > 500) {
			this.slider.current.slickGoTo(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0);
		}
	}


	componentDidUpdate(prevProps) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.initContract();
		}
	}

	componentWillUnmount() {
		this.props.clearContractInfo();
		BridgeService.unsubscribeSwitchAccount(this.props.setActiveAccount);
		echo.subscriber.removeContractSubscribe(this.subscriber);
	}

	onLoadMoreHistory() {
		this.props.loadContractHistory(this.props.history.last()[0].id.split('.')[2]);
	}

	initContract() {
		const { id } = this.props.match.params;

		this.props.setTitle(TITLE_TEMPLATES.CONTRACT.replace(/id/, id));
		this.props.getContractInfo();
		echo.subscriber.removeContractSubscribe(this.subscriber);
		echo.subscriber.setContractSubscribe([id], this.subscriber);
	}


	updateInfo() {
		const { history, loading } = this.props;
		const first = history.first();

		if (loading) { return; }

		this.props.updateContractInfo(first ? first[0].id : first);
	}

	goToSlide(slide) {
		this.slider.current.slickGoTo(slide);
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
			bytecode, history, balances, match: { params: { id, detail } }, abi, sourceCode, icon,
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
						transactions={history}
						loading={loadingMoreHistory}
						loadMore={history.size && !isFullHistory ? () => this.onLoadMoreHistory() : null}
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
					<ContractAbi abi={abi} /> : <Loader />,
				key: 'tab-4',
			},
			{
				tab: !loading ?
					<ContractSourceCode value={sourceCode} /> : <Loader />,
				key: 'tab-5',
			},
		];
		const settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: tabList.length,
			slidesToScroll: 1,
			variableWidth: true,
			touchMove: false,
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 3,
					},
				},
			],
		};
		return (
			<div className="table-container inner-information-container account-page contract-page with-d-table">
				<div className="react-tabs">
					<div className="tab-head">
						<div className="backwards">
							<a
								href=""
								className="backwards-link"
								onClick={(e) => { e.preventDefault(); }}
							>
								<BackwardIcon />
							</a>
							<div className="account-page-t-block">
								<Media query="(max-width: 500px)">
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
									<button className="action-button">
										<img src={manageIcon} alt="" />
										<span className="content">Manage</span>
									</button>
								</div>
							</div>
							<div className="item">
								<Verify verified={verified} />
							</div>
						</div>
						<Media query="(max-width: 500px)">
							{(matches) =>
								(!matches ?
									<div className="horizontal-tab-panel">
										<Slider ref={this.slider} {...settings}>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 })}>
												<Link
													onClick={() => this.goToSlide(0)}
													to={URLHelper.createContractUrl(id)}
												>
													<span className="menu-item-content">Contract info</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 })}>
												<Link
													onClick={() => this.goToSlide(1)}
													to={URLHelper.createContractUrl(id, CONTRACT_TRANSACTIONS)}
												>
													<span className="menu-item-content">Transactions (43)</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 })}>
												<Link
													onClick={() => this.goToSlide(2)}
													to={URLHelper.createContractUrl(id, CONTRACT_BYTECODE)}
												>
													<span className="menu-item-content">Bytecode</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 3 })}>
												<Link
													onClick={() => this.goToSlide(3)}
													to={URLHelper.createContractUrl(id, CONTRACT_BALANCES)}
												>
													<span className="menu-item-content">Balances</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 4 })}>
												<Link
													onClick={() => this.goToSlide(4)}
													to={URLHelper.createContractUrl(id, CONTRACT_ABI)}
												>
													<span className="menu-item-content">ABI</span>
												</Link>
											</div>
											<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 5 })}>
												<Link
													onClick={() => this.goToSlide(5)}
													to={URLHelper.createContractUrl(id, CONTRACT_SURCE_CODE)}
												>
													<span className="menu-item-content">Source code</span>
												</Link>
											</div>
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
													<span className="doropdown-tab-item">Transactions (43)</span>
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
	sourceCode: PropTypes.string.isRequired,
	abi: PropTypes.object.isRequired,
	compilerVersion: PropTypes.string.isRequired,
	verified: PropTypes.bool.isRequired,
	stars: PropTypes.object.isRequired,

	activeAccount: PropTypes.object,
	owner: PropTypes.object.isRequired,
};

Contract.defaultProps = {
	loading: false,
	isFullHistory: false,
	loadingMoreHistory: false,
	bytecode: null,
	supportedAsset: '',
	activeAccount: new Map(),
};

export default Contract;
