import React, { memo } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import PropTypes from 'prop-types';

const InfoBlockItem = ({
	title, value, className, isLink, href, as,
}) => (
	<div className={cn('info-block__item', className)}>
		<div className="title">{title}</div>
		{ !isLink &&
			<div className="value">{value}</div>
		}
		{ isLink &&
		<Link href={href} as={as}>
			<a className="value">{value}</a>
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
};

InfoBlockItem.defaultProps = {
	className: '',
	isLink: false,
	href: '',
	as: '',
};
export default memo(InfoBlockItem);
