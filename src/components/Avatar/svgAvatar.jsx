import PropTypes from 'prop-types';
import { svgAvatar } from 'echojs-ping';
import React from 'react';

function SvgAvatarComponent({ accountName, avatarSize }) {
	return (
		<div dangerouslySetInnerHTML={{ __html: svgAvatar(accountName, avatarSize) }} />
	);
}

SvgAvatarComponent.propTypes = {
	accountName: PropTypes.string,
	avatarSize: PropTypes.number,
};

SvgAvatarComponent.defaultProps = {
	avatarSize: null,
	accountName: '',
};

export default SvgAvatarComponent;
