import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Router, { withRouter } from 'next/router';

import InfoTooltip from '../../components/InfoTooltip';
import URLHelper from '../../helpers/URLHelper';
import { SSR_VERIFY_CONTRACT_PATH } from '../../constants/RouterConstants';

class Verify extends Component {

	constructor(props) {
		super(props);
		this.state = {
			tooltipSize: 290,
		};
		this.listener = this.updateTooltipSize.bind(this);
	}

	componentDidMount() {
		this.updateTooltipSize();
		window.addEventListener('resize', this.listener);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.listener);
	}

	updateTooltipSize() {
		if (window.innerWidth > 499) {
			this.setState({
				tooltipSize: 290,
			});
			return;
		}
		this.setState({
			tooltipSize: 200,
		});
	}

	render() {
		const { verified, id } = this.props;
		const { tooltipSize } = this.state;
		const tip = (
			<React.Fragment>
				<p>
					If you created this contract you can verify it by uploading source code.
				</p>
				<p>
					This will allow users to review code before they start using it.
					It is important to provide such transparency.
					That will allow users to trust that the code does what was expected.
				</p>
			</React.Fragment>
		);

		const tooltipStyle = {
			width: tooltipSize,
		};

		return (
			<div className={classnames('action-button-wrap', { verified })}>
				<div className="action-label">
					{
						verified ?
							<span className="content">Verified contract</span> :
							<span className="content">Unverified contract</span>
					}

					<InfoTooltip
						placement={tooltipSize === 200 ? 'rightTop' : 'rightBottom'}
						overlay={tip}
						overlayStyle={tooltipStyle}
						overlayClassName="verify-contract-tooltip"
						iconFilled={false}
					/>
				</div>
				<button className="action-button" onClick={() => Router.push(SSR_VERIFY_CONTRACT_PATH, URLHelper.createVerifyContractUrl(id))}>
					<span className="content">Verify</span>
				</button>

			</div>
		);
	}

}

Verify.propTypes = {
	verified: PropTypes.bool,
	id: PropTypes.string.isRequired,
};

Verify.defaultProps = {
	verified: false,
};

export default withRouter(Verify);
