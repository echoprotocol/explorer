import React from 'react';
import RecentBlockTable from './RecentBlockTable';
import BlockInformation from './BlockInformation';
import TransactionInfo from './TransactionsInfo';
import RecentBlockSidebar from './RecentBlockSidebar';

class MainContainer extends React.Component {

	constructor() {
		super();

		this.state = {
			blockInfo: true,
			trnsInfo: false,
		};

		this.switchBlockInfo = this.switchBlockInfo.bind(this);
		this.switchTransInfo = this.switchTransInfo.bind(this);
	}

	switchBlockInfo(value) {
		this.setState({
			blockInfo: value,
			trnsInfo: false,
		});
	}

	switchTransInfo(value) {
		this.setState({
			blockInfo: false,
			trnsInfo: value,
		});
	}

	render() {
		return (
			<div className="recent-block-section">
				<div className="wrap">
					{
						(!this.state.blockInfo && !this.state.trnsInfo) && (<RecentBlockTable switchToBlockInfo={this.switchBlockInfo} />)
					}
					{
						(this.state.blockInfo) && (<BlockInformation switchToTransInfo={this.switchTransInfo} />)
					}
					{
						(this.state.trnsInfo) && (<TransactionInfo switchToBlockInfo={this.switchBlockInfo} />)
					}
					<RecentBlockSidebar />
				</div>
			</div>
		);
	}

}

export default MainContainer;
