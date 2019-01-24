import React from 'react';
// import PropTypes from 'prop-types';

class AccountBalances extends React.Component {

	render() {
		return (
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
		);
	}

}

AccountBalances.propTypes = {};

export default AccountBalances;
