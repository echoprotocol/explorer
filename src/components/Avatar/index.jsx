import React from 'react';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import avatar from '../../public/images/default-avatar.svg';

const SvgAvatar = dynamic(() => import('./svgAvatar'), {
	ssr: false,
});

class Avatar extends React.Component {

	static updateAccountName(props) {
		return { accountName: props.accountName };
	}

	constructor(props) {
		super(props);

		this.state = {
			avatarSize: null,
			accountName: '',
		};
		this.imageRef = React.createRef();
		this.listener = this.updateAvatarSize.bind(this);
	}

	componentDidMount() {
		this.updateAvatarSize();
		window.addEventListener('resize', this.listener);
		window.addEventListener('load', this.listener);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		const { accountName } = prevState;
		if ((accountName !== nextProps.accountName && nextProps.accountName) || nextProps.reset) {
			return Avatar.updateAccountName(nextProps);
		}
		return null;
	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.reset) return true;
		if (nextProps.loading) return false;
		if (nextProps.accountName.length === 0) return false;
		if (this.state.accountName === nextProps.accountName) return false;
		return true;
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.listener);
	}

	updateAvatarSize() {
		if (!this.imageRef.current) {
			return;
		}
		const avatarSize = this.imageRef.current.offsetHeight;
		if (avatarSize !== this.state.avatarSize) {
			this.setState({ avatarSize });
		}
	}

	render() {
		const { round } = this.props;
		const { avatarSize, accountName } = this.state;


		return (
			<div ref={this.imageRef} className={classnames('avatar-image', { round })}>
				{
					!accountName ? <img src={avatar} alt="avatar" /> : (
						<SvgAvatar accountName={accountName} avatarSize={avatarSize} />
					)
				}
			</div>
		);
	}

}

Avatar.propTypes = {
	accountName: PropTypes.string,
	round: PropTypes.bool,
	loading: PropTypes.bool,
	reset: PropTypes.bool,
};

Avatar.defaultProps = {
	accountName: '',
	round: false,
	loading: false,
	reset: true,
};

export default Avatar;
