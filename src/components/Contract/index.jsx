import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import echo from 'echojs-lib';
import Media from 'react-media';
import Slider from 'react-slick';
import classnames from 'classnames';
import { Dropdown } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar';

import ContractBytecode from './ContractBytecode';
import ContractInfo from './ContractInfo';
import AssetBalances from '../Account/AssetBalances';
import TransactionsTable from '../BlockInformation/TransactionsTable';
import Loader from '../Loader';
import BackwardIcon from '../BackwardIcon';

import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import URLHelper from '../../helpers/URLHelper';
import {
	CONTRACT_BALANCES,
	CONTRACT_BYTECODE,
	CONTRACT_TRANSACTIONS,
	CONTRACT_DETAILS_NUMBERS_TAB,
	CONTRACT_ABI, CONTRACT_SURCE_CODE,
} from '../../constants/RouterConstants';

import Star from '../StarButton';
import Verify from '../VerifyButton';
import tempAvatar from '../../assets/images/temp/avatar.png';
import manageIcon from '../../assets/images/icons/pencil.svg';
import ContractAbi from './ContractAbi';
import ContractSourceCode from './ContractSourceCode';

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
			bytecode, history, balances, match: { params: { id, detail } },
		} = this.props;

		const tabList = [
			{
				tab: !loading ?
					<ContractInfo /> : <Loader />,
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
					<ContractAbi /> : <Loader />,
				key: 'tab-4',
			},
			{
				tab: !loading ?
					<ContractSourceCode /> : <Loader />,
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
											<img src={tempAvatar} alt="" />
										</div>
									}
								</Media>

								<div className="title">Contract {id}: ‘Homer Simpson and Family’</div>
							</div>
						</div>
						<div className="buttons-wrap">
							<div className="item">
								<Star />
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
								<Verify />
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
};

Contract.defaultProps = {
	loading: false,
	isFullHistory: false,
	loadingMoreHistory: false,
	bytecode: null,
};

export default Contract;
