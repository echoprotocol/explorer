import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import infoIcon from '../../assets/images/icons/info.svg';
import infoHoverIcon from '../../assets/images/icons/info-hover.svg';
import infoWhiteIcon from '../../assets/images/icons/info-white.svg';
import URLHelper from '../../helpers/URLHelper';
import ActionButton from '../ActionButton';

class Verify extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
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

	changeHover(value) {
		this.setState({ hovered: value });
	}

	render() {
		const { verified, id } = this.props;
		const { hovered, tooltipSize } = this.state;
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

					<Tooltip
						placement={tooltipSize === 200 ? 'rightTop' : 'rightBottom'}
						trigger={['hover']}
						overlay={tip}
						overlayStyle={tooltipStyle}
						overlayClassName="verify-contract-tooltip"
					>
						<button
							onMouseEnter={() => this.changeHover(true)}
							onMouseLeave={() => this.changeHover(false)}
							tabIndex={-1}
							className="info-icon"
						>
							{
								verified ?
									<img src={infoWhiteIcon} alt="" /> :
									<img src={hovered ? infoHoverIcon : infoIcon} alt="" />
							}
						</button>
					</Tooltip>
				</div>
				<ActionButton value="Verify" action={() => this.props.history.push(URLHelper.createVerifyContractUrl(id))} />
			</div>
		);
	}

}

Verify.propTypes = {
	verified: PropTypes.bool,
	id: PropTypes.string.isRequired,
	history: PropTypes.object.isRequired,
};

Verify.defaultProps = {
	verified: false,
};

export default withRouter(Verify);
