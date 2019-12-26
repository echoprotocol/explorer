import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
					{isOpen ? 'hide' : 'show'}
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
