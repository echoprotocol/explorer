import React from 'react';
import Media from 'react-media';
import LoadMoreBtn from '../../../components/LoadMoreBtn';
import HeaderSearchField from '../../../components/SearchFields/HeaderSearchField';

class RecentBlockTable extends React.Component {

	render() {

		const codingData = [
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
			{
				blockNumber: '1,265,456',
				time: '12:53:15',
				producer: 'GeorgeLukas',
				reward: '0.3123',
				rewardCurrency: 'echo',
				weight: '3.125',
				weightSize: 'mb',
				transactions: '1.757',
			},
		];

		return (
			<div className="table-container recent-block-table">
				<h2>Recent blocks
					<Media query="(max-width: 767px)">
						{(matches) =>
							(matches ? (
								<HeaderSearchField small white placeholder="Search by block" />
							) : (
								<HeaderSearchField small white placeholder="Search by block number" />
							))
						}
					</Media>
				</h2>
				<div className="table">
					<Media query="(max-width: 767px)">
						{(matches) =>
							(matches ? (
								<div className="recent-block-mobile-view">
									{
										codingData.map((data) => (
											<div className="recent-block-element">
												<div className="container">
													<div className="title">Block #</div>
													<div className="value"><a href="" className="blue" onClick={(e) => e.preventDefault()}>{data.blockNumber}</a></div>
												</div>
												<div className="container">
													<div className="title">Block time</div>
													<div className="value">{data.time}</div>
												</div>
												<div className="container">
													<div className="title">Producer</div>
													<div className="value">{data.producer}</div>
												</div>
												<div className="container">
													<div className="title">Reward</div>
													<div className="value">{data.reward} <span className="gray">{data.rewardCurrency}</span></div>
												</div>
												<div className="container">
													<div className="title">Weight</div>
													<div className="value">{data.weight} <span className="gray">{data.weightSize}</span></div>
												</div>
												<div className="container">
													<div className="title">Transactions</div>
													<div className="value">{data.transactions}</div>
												</div>
											</div>
										))
									}
								</div>
							) : (
								<div className="divTable">
									<div className="divTableBody">
										<div className="TableHeading">
											<div className="divTableCell">
												<Media query="(max-width: 999px)">
													{(matches) =>
														(matches ? (
															'Block #'
														) : (
															'Block number'
														))
													}
												</Media>
											</div>
											<div className="divTableCell">
												<Media query="(max-width: 999px)">
													{(matches) =>
														(matches ? (
															'Time'
														) : (
															'Time (GTM+1)'
														))
													}
												</Media>
											</div>
											<div className="divTableCell">Producer</div>
											<div className="divTableCell">Reward</div>
											<div className="divTableCell">Weight</div>
											<div className="divTableCell">Transactions</div>
										</div>
										<div className="devider" />
										{
											codingData.map((data) => (
												<React.Fragment>
													<div className="divTableRow">
														<div className="divTableCell"><a href="" className="blue" onClick={(e) => e.preventDefault()}>{data.blockNumber}</a></div>
														<div className="divTableCell">{data.time}</div>
														<div className="divTableCell"><div className="inner-container">{data.producer}</div></div>
														<div className="divTableCell">{data.reward} <span className="gray">{data.rewardCurrency}</span></div>
														<div className="divTableCell">{data.weight} <span className="gray">{data.weightSize}</span></div>
														<div className="divTableCell">{data.transactions}</div>
													</div>
												</React.Fragment>
											))
										}
									</div>
								</div>
							))
						}
					</Media>
					<LoadMoreBtn />
				</div>
			</div>
		);
	}

}

export default RecentBlockTable;
