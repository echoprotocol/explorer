import React from 'react';
import PropTypes from 'prop-types';

class FilterCheckbox extends React.Component {

	onChange(e) {
		e.target.blur();
		this.props.onChange();
	}

	render() {
		return (
			<div className="checkbox">
				<input
					type="checkbox"
					id="checkbox-input"
					checked={this.props.checked}
					onChange={(e) => this.onChange(e)}
				/>
				<label htmlFor="checkbox-input">{this.props.title}</label>
			</div>
		);
	}

}

FilterCheckbox.propTypes = {
	title: PropTypes.string.isRequired,
	checked: PropTypes.bool.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default FilterCheckbox;
