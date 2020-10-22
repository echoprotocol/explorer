import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import echo from 'echojs-lib';
import Slider from 'react-slick';
import classnames from 'classnames';
import { Map } from 'immutable';

import { CONTRACT_TABS, ERC20_TOKEN_SYMBOL } from '../../constants/ContractConstants';
import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import {
	CONTRACT_TRANSACTIONS,
	CONTRACT_DETAILS_NUMBERS_TAB,
	CONTRACT_SOURCE_CODE,
	CONTRACT_ABI,
	CONTRACT_ERC20,
	SSR_CONTRACT_PATH,
	SSR_MANAGE_CONTRACT_PATH,
	SSR_CONTRACT_DETAILS_PATH,
	SSR_VERIFY_CONTRACT_PATH,
} from '../../constants/RouterConstants';

import Loader from '../Loader';
import ContractAbi from './ContractAbi';
import ContractSourceCode from './ContractSourceCode';
import ContractInfo from './ContractInfo';
import ErcInfo from '../ErcInfo';
import { ContractIcon } from './ContractIcon';
import CopyBtn from '../Buttons/CopyBtn';
import InnerHeader from '../InnerHeader';
import ActionButton from '../Buttons/ActionButton';
// import { BridgeService } from '../../services/BridgeService';
import { subscribeContractHistoryUpdate } from '../../services/subscriptions/contract';

import URLHelper from '../../helpers/URLHelper';
import FormatHelper from '../../helpers/FormatHelper';
import OperationsTable from '../../containers/OperationsTable';
import { CONTRACT_GRID } from '../../constants/TableConstants';
import ContractActions from '../../actions/ContractActions';
import GridActions from '../../actions/GridActions';

import editIcon from '../../public/images/icons/edit-icon.svg';
import starIcon from '../../public/images/icons/star-icon.svg';


class Contract extends React.Component {

	constructor(props) {
		super(props);
		this.updateHistorySubscriber = null;
		this.subscriber = this.updateInfo.bind(this);
		this.slider = React.createRef();
		this.manageContract = this.manageContract.bind(this);
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

		if (this.slider.current) {
			this.slider.current.slickGoTo(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0);
		}

		this.subscribe(id);
	}


	componentDidUpdate(prevProps) {
		if (prevProps.router.query.id && prevProps.router.query.id !== this.props.router.query.id) {
			this.initContract();
		}
		if (prevProps.connected !== this.props.connected && this.props.connected) {
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

	onLoadMoreErc20History() {
		this.props.loadErc20History(this.props.router.query.id);
	}

	async initContract() {
		const { query: { id } } = this.props.router;
		await this.props.onChangeFilter();
		this.props.setTitle(TITLE_TEMPLATES.CONTRACT.replace(/id/, id));
		if (echo.isConnected) {
			await this.props.getContractInfo(id);
			echo.subscriber.removeContractSubscribe(this.subscriber);
			echo.subscriber.setContractSubscribe([id], this.subscriber);
		}
	}

	updateInfo() {
		const { loading, router } = this.props;
		if (loading) { return; }
		this.props.updateContractInfo(router.query.id);
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
			loading, loadingMoreHistory, filterAndPaginateData, initData,
			bytecode, contractHistory, balances, router: { query: { id, detail } }, abi, sourceCode, icon,
			name, verified, stars, description, createdAt, blockNumber, creationFee,
			type, contractTxs, countUsedByAccount, supportedAsset, ethAccuracy, compilerVersion, owner, token,
			countTokenTransfer, tokenTransfers, activeAccount, error, isMobile,
		} = this.props;

		const tabList = [
			{
				tab: !loading ?
					<OperationsTable
						isASCOps={false}
						onLoadMoreHistory={() => this.onLoadMoreHistory()}
						gridName={CONTRACT_GRID}
						operations={contractHistory}
						router={this.props.router}
						loading={loadingMoreHistory}
						label={FormatHelper.getFormaOperationsTitle(contractTxs)}
						timestamp
					/> : <Loader />,
				key: 'tab-0',
			},
			{
				tab: !loading ?
					<div className="contract-abi">
						<ContractAbi id={id} abi={abi} verified={verified} />
						{verified && <ContractSourceCode sourceCode={sourceCode} />}
						{!verified && <ActionButton name="Verify contract" onClick={() => Router.push(SSR_VERIFY_CONTRACT_PATH, URLHelper.createVerifyContractUrl(id))} />}
					</div> : <Loader />,
				key: 'tab-1',
			},
			type.includes(ERC20_TOKEN_SYMBOL) && {
				tab: !loading ?
					<ErcInfo
						filterAndPaginateData={filterAndPaginateData}
						tokenTransfers={tokenTransfers}
						countTokenTransfer={countTokenTransfer}
						token={token}
						onLoadMoreHistory={() => this.onLoadMoreErc20History()}
						initData={initData}
						router={this.props.router}
					/> :
					<Loader />,
				key: 'tab-2',
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
			initialSlide: CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0,
			responsive: [
				{
					breakpoint: 500,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
			],
		};

		return (
			<div className="inner-container">
				<div className="contract-tabs">
					<div className="page-info contract-info">
						<InnerHeader>
							<ContractIcon icon={icon} className="inner-header__icon" />
							<div className="contract-header-title">Contract {id} {name && `: ${name}`}</div>
							<div className="inner-header-buttons">
								<CopyBtn valueToCopy={bytecode || ''} name="Copy Code" />
								<ActionButton
									name={stars.includes(activeAccount.get('id')) ? 'Unstar' : 'Star'}
									onClick={() => this.props.setStarToContract(id)}
									label={stars.includes(activeAccount.get('id')) ? `${stars.size}` : null}
									icon={starIcon}
								/>
								<ActionButton name="Edit info" onClick={this.manageContract} icon={editIcon} />
							</div>
						</InnerHeader>
						<React.Fragment>
							{ !loading ?
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
										blockNumber,
										createdAt,
										owner,
									})}
									dataAssets={new Map({
										isMobile,
										balances,
									})}
								/>
								: <Loader />}
						</React.Fragment>
						<div className={classnames('horizontal-tab-panel', { 'server-slick-track': typeof window === 'undefined' })}>
							<Slider ref={this.slider} {...settings} >
								<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 0 })}>
									<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_TRANSACTIONS)} scroll={false}>
										<a href="" onClick={(e) => this.goToSlide(e, 0)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 ? -1 : null}>
											<span className="menu-item-content">{`Operations (${contractTxs})`}</span>
										</a>
									</Link>
								</div>
								<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 })}>
									<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_ABI)} scroll={false}>
										<a href="" onClick={(e) => this.goToSlide(e, 1)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 1 ? -1 : null}>
											<span className={classnames('menu-item-content with-icon', { verified }, { unverified: !verified })}>Source Code & ABI</span>
										</a>
									</Link>
								</div>
								{type.includes(ERC20_TOKEN_SYMBOL) &&
								<div className={classnames('menu-item', { active: (CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 })}>
									<Link href={SSR_CONTRACT_DETAILS_PATH} as={URLHelper.createContractUrl(id, CONTRACT_ERC20)} scroll={false}>
										<a href="" onClick={(e) => this.goToSlide(e, 2)} tabIndex={(CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) === 2 ? -1 : null}>
											<span className="menu-item-content">ERC20 info</span>
										</a>
									</Link>
								</div>}
							</Slider>
						</div>
					</div>
					<div className="tab-body">
						{ this.renderTabs(tabList, CONTRACT_DETAILS_NUMBERS_TAB[detail] || 0) }
					</div>
				</div>
			</div>
		);
	}

}

Contract.propTypes = {
	connected: PropTypes.bool.isRequired,
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
	tokenTransfers: PropTypes.array,

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
	onChangeFilter: PropTypes.func.isRequired,
	filterAndPaginateData: PropTypes.object.isRequired,
	initData: PropTypes.func.isRequired,
	loadErc20History: PropTypes.func.isRequired,
};

Contract.defaultProps = {
	error: '',
	loading: false,
	loadingMoreHistory: false,
	bytecode: null,
	sourceCode: null,
	supportedAsset: '',
	activeAccount: new Map(),
	token: {},
	tokenTransfers: [],
};

Contract.getInitialProps = async ({ query: { id: contractId, ...filters }, store }) => {
	await store.dispatch(GridActions.initData(CONTRACT_GRID, filters));
	await store.dispatch(ContractActions.getContractInfo(contractId));
	return {};
};

export default withRouter(Contract);
