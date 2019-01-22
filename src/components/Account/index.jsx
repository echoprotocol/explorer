import React from 'react';
import Media from 'react-media';
import PropTypes from 'prop-types';

import RecentBlockSidebar from '../../containers/RecentBlockSection/RecentBlockSidebar';

class Account extends React.Component {

	componentDidMount() {
		this.props.getAccountInfo();

	}

	componentWillUnmount() {
		this.props.clearAccountInfo();
	}

	render() {
		const codingData = [
			{
				blockNumber: '1.',
				type: 'Place order',
				from: 'GeorgeLukas',
				to: '1.16.2345.235',
				amount: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				status: 'Success',
			},
		];

		return (
			<div className="recent-block-section">
				<div className="wrap">
					<div className="table-container inner-information-container block-information account-page">
						<div className="account-page-t-block">
							<div className="title">Account <span className="accent">1.16.1231</span></div>
							<div className="help-container">
								<div className="left-card">
									<div className="line">
										<div className="title">Account name</div>
										<div className="val">Homer1956</div>
									</div>
									<div className="line">
										<div className="title">Echo balance</div>
										<div className="val"><span className="txt">234.055432</span><span className="accent">ECHO</span></div>
									</div>
								</div>
								<div className="right-container">
									<div className="elem">
										<div className="title">other assets: 23</div>
										<div className="elements-container">
											<div className="inner-elem is-owner">
												<span className="txt">0.003245</span><span className="accent">EKC</span>
											</div>
											<div className="inner-elem">
												<span className="txt">0.003245</span><span className="accent">DRM</span>
											</div>
											<div className="inner-elem">
												<span className="txt">0.003245</span><span className="accent">ZSCH</span>
											</div>
											<div className="inner-elem">
												<span className="txt">0.0032934245</span><span className="accent">DSKL</span>
											</div>
										</div>
										<a href="" className="load-more">View 19 more</a>
									</div>
									<div className="elem">
										<div className="title">tokens:<span className="gray">none</span></div>
									</div>
								</div>
							</div>
						</div>
						<h2>43 Transactions</h2>
						<div className="table">
							<Media query="(max-width: 767px)">
								{(matches) =>
									(matches ? (
										<div className="recent-block-mobile-view">
											{
												codingData.map((data) => (
													<a href="" key={Math.random()} className="recent-block-element" onClick={(e) => { e.preventDefault(); }}>
														<div className="container">
															<div className="title">#</div>
															<div className="value">{data.blockNumber}</div>
														</div>
														<div className="container">
															<div className="title">Type</div>
															<div className="value">{data.type}</div>
														</div>
														<div className="container">
															<div className="title">From</div>
															<div className="value"><div className="blue">{data.from}</div></div>
														</div>
														<div className="container">
															<div className="title">To</div>
															<div className="value"><div className="blue">{data.to}</div></div>
														</div>
														<div className="container amount">
															<div className="title">Amount</div>
															<div className="value">{data.weight} <span className="gray">{data.amount}</span></div>
														</div>
														<div className="container">
															<div className="title">Fee amount</div>
															<div className="value">{data.weight} <span className="gray">{data.amount}</span></div>
														</div>
														<div className={`container ${(data.status === 'Fail' ? ('fail') : '')}`}>
															<div className="title">Status</div>
															<div className="value">{data.status}</div>
														</div>
													</a>
												))
											}
											<a href="" className="recent-block-element with-subtransfer" onClick={(e) => { e.preventDefault(); }}>
												<div className="container">
													<div className="title">#</div>
													<div className="value">6.</div>
												</div>
												<div className="container">
													<div className="title">Type</div>
													<div className="value">Place order</div>
												</div>
												<div className="container">
													<div className="title">From</div>
													<div className="value"><div className="blue">GeorgeGeorge</div></div>
												</div>
												<div className="container">
													<div className="title">To</div>
													<div className="value"><div className="blue">1.26.8754.123</div></div>
												</div>
												<div className="container amount">
													<div className="title">Amount</div>
													<div className="value">7.532 <span className="gray">echo</span></div>
												</div>
												<div className="container">
													<div className="title">Fee amount</div>
													<div className="value">7.532 <span className="gray">echo</span></div>
												</div>
												<div className="container success">
													<div className="title">Status</div>
													<div className="value">Success</div>
												</div>
											</a>
											<div className="recent-block-element is-subtransfer">
												<div className="subtransfer-type">Subtransfer</div>
												<div className="line-arrow" />
												<div className="container amount">
													<div className="title">Amount</div>
													<div className="value">7.532 <span className="gray">echo</span></div>
												</div>
												<div className="container">
													<div className="title">From</div>
													<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>GeorgeGeorge</a></div>
												</div>
												<div className="container">
													<div className="title">To</div>
													<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>1.26.8754.123</a></div>
												</div>
											</div>
											<div className="recent-block-element is-subtransfer is-subtransfer_last">
												<div className="subtransfer-type">ERC20 Token transfer</div>
												<div className="line-arrow" />
												<div className="container amount">
													<div className="title">Amount</div>
													<div className="value">7.532 <span className="gray">echo</span></div>
												</div>
												<div className="container">
													<div className="title">From</div>
													<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>GeorgeGeorge</a></div>
												</div>
												<div className="container">
													<div className="title">To</div>
													<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>1.26.8754.123</a></div>
												</div>
											</div>
										</div>
									) : (
										<div className="divTable">
											<div className="divTableBody">
												<div className="TableHeading">
													<div className="divTableCell">#</div>
													<div className="divTableCell">Type</div>
													<div className="divTableCell">From</div>
													<div className="divTableCell">To</div>
													<div className="divTableCell">Amount</div>
													<div className="divTableCell">Fee amount</div>
													<div className="divTableCell">Status</div>
												</div>
												<div className="devider" />
												{
													codingData.map((data) => (
														<React.Fragment key={Math.random()}>
															<a href="" className="divTableRow" onClick={(e) => { e.preventDefault(); }}>
																<div className="divTableCell">{data.blockNumber}</div>
																<div className="divTableCell">{data.type}</div>
																<div className="divTableCell">
																	<div className="inner-container"><div className="blue">{data.from}</div></div>
																</div>
																<div className="divTableCell transaction-to">
																	<div className="sub-container"><div className="blue">{data.to}</div></div>
																</div>
																<div className="divTableCell">{data.weight} <span className="gray">{data.amount}</span></div>
																<div className="divTableCell">{data.weight} <span className="gray">{data.amount}</span></div>
																<div className={`divTableCell ${(data.status === 'Fail' ? ('fail') : '')}`}>{data.status}</div>
															</a>
														</React.Fragment>
													))
												}

												{/* Класс with-subtransfer добавляется для главного элемента, который имееет сабтрансферы */}

												<a href="" onClick={(e) => { e.preventDefault(); }} className="divTableRow with-subtransfer">
													<div className="divTableCell">6.</div>
													<div className="divTableCell">Place order</div>
													<div className="divTableCell">
														<div className="inner-container"><div className="blue">GeorgeLukas</div></div>
													</div>
													<div className="divTableCell transaction-to">
														<div className="sub-container">
															<div className="blue">1.26.1236.457</div>
														</div>
													</div>
													<div className="divTableCell">5.653 <span className="gray">echo</span></div>
													<div className="divTableCell">5.653 <span className="gray">echo</span></div>
													<div className="divTableCell success">Success</div>
												</a>
												{/* Класс is-subtransfer добавляется для самих сабтрансферов */}

												<div className="divTableRow is-subtransfer">
													<div className="divTableCell" />
													<div className="divTableCell" />
													<div className="divTableCell">
														<div className="inner-container"><div className="blue">alpha-centos</div></div>
													</div>
													<div className="divTableCell transaction-to">
														<div className="sub-container">
															{/* Блок line-arrow добавляется только для строк с классом is-subtransfer */}
															<div className="line-arrow" />
															<div className="blue">openledger-dc</div>
														</div>
													</div>
													<div className="divTableCell">
														<div className="sub-container">
															5.653 <span className="gray">echo</span>
															<div className="subtransfer-type">Subtransfer</div>
														</div>
													</div>
													<div className="divTableCell" />
													<div className="divTableCell success" />
												</div>
												<div className="divTableRow is-subtransfer is-subtransfer_last">
													<div className="divTableCell" />
													<div className="divTableCell" />
													<div className="divTableCell">
														<div className="inner-container"><div className="blue">ozanselvi1989</div></div>
													</div>
													<div className="divTableCell transaction-to">
														<div className="sub-container">
															{/* Блок line-arrow добавляется только для строк с классом is-subtransfer */}
															<div className="line-arrow" />
															<div className="blue">gauto01</div>
														</div>
													</div>
													<div className="divTableCell">
														<div className="sub-container">
															5.653 <span className="gray">echo</span>
															<div className="subtransfer-type">ERC20 Token transfer</div>
														</div>
													</div>
													<div className="divTableCell" />
													<div className="divTableCell success" />
												</div>
											</div>
										</div>
									))
								}
							</Media>
							{/* <LoadMoreBtn /> */}
						</div>
					</div>
					<RecentBlockSidebar />
				</div>
			</div>
		);
	}

}

Account.propTypes = {
	getAccountInfo: PropTypes.func.isRequired,
	clearAccountInfo: PropTypes.func.isRequired,
};

export default Account;
