import React from 'react';
import Tooltip from 'rc-tooltip';
import PropTypes from 'prop-types';

import infoIcon from '../../public/images/icons/info-icn.svg';
import infoHoverIcon from '../../public/images/icons/info-hover.svg';

class InfoTooltip extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hovered: false,
		};
	}

	changeHover(value) {
		this.setState({ hovered: value });
	}

	render() {

		const { hovered } = this.state;
		const { tooltipText	} = this.props;

		return (
			<Tooltip
				placement="rightBottom"
				trigger={['hover']}
				overlay={<span>{tooltipText}</span>}
				onMouseEnter={() => this.changeHover(true)}
				onMouseLeave={() => this.changeHover(false)}
			>
				<span className="tooltip">
					<img src={hovered ? infoHoverIcon : infoIcon} alt="" />
				</span>
			</Tooltip>

		);
	}

}

InfoTooltip.propTypes = {
	tooltipText: PropTypes.string,
};

InfoTooltip.defaultProps = {
	tooltipText: '',
};

export default InfoTooltip;
