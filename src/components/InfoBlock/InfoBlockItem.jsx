import React, { memo } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import PropTypes from 'prop-types';
import InfoTooltip from '../InfoTooltip';

const InfoBlockItem = ({
	title, value, className, isLink, href, as, withTooltip, overlay,
}) => (
	<div className={cn('info-block__item', className)}>
		<div className="title">{title}</div>
		{ !isLink &&
			<div className="value">
				{value}
				{withTooltip &&
					<InfoTooltip
						iconFilled={false}
						overlay={overlay}
					/>
				}
			</div>
		}
		{ isLink &&
		<Link href={href} as={as}>
			<a className="value">
				{value}
				{withTooltip &&
					<InfoTooltip
						iconFilled={false}
						overlay={overlay}
					/>
				}
			</a>
		</Link>}

	</div>
);

InfoBlockItem.propTypes = {
	title: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	className: PropTypes.string,
	isLink: PropTypes.bool,
	href: PropTypes.string,
	as: PropTypes.string,
	withTooltip: PropTypes.bool,
	overlay: PropTypes.bool,
};

InfoBlockItem.defaultProps = {
	className: '',
	isLink: false,
	href: '',
	as: '',
	withTooltip: false,
	overlay: '',
};

export default memo(InfoBlockItem);
