import React, { Component } from 'react';
import PropTypes from 'prop-types';
import arrow from '../../public/images/icons/show-list-arrow.svg';

class ViewListPopover extends Component {

	render() {

		const { isOpen, toggleReward } = this.props;

		return (
			<div className="view-list-container">
				<a
					href=""
					className={`view-list ${isOpen ? 'is-open' : ''}`}
					onClick={(e) => { e.preventDefault(); toggleReward(); }}
				>
					<span className="view-list-text">{isOpen ? 'Hide' : 'Show'}</span>
					<span className="view-list-icon">
						<img src={arrow} alt="" />
					</span>
				</a>
			</div>
		);
	}

}

ViewListPopover.propTypes = {
	toggleReward: PropTypes.func.isRequired,
	isOpen: PropTypes.bool.isRequired,
};

export default ViewListPopover;
