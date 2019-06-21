import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import infoIcon from '../../assets/images/icons/info.svg';
import infoHoverIcon from '../../assets/images/icons/info-hover.svg';

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
			<div className="action-button-wrap">
				<div className="action-label">
					<span className="content">Unverified contract</span>

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
							className="info-icon"
						>
							<img src={hovered ? infoHoverIcon : infoIcon} alt="" />
						</button>
					</Tooltip>
				</div>
				<button className="action-button">
					<span className="content">Verify</span>
				</button>

			</div>
		);
	}

}

export default Verify;
