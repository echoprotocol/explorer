/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { KEY_CODE_ENTER, KEY_CODE_ESC } from '../../constants/GlobalConstants';


class SearchField extends React.Component {

	constructor() {
		super();

		this.state = {
			focus: false,
			isChange: false,
			isActiveSmall: false,
			inputValue: '',
		};
		this.searchTimeout = null;
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		clearTimeout(this.searchTimeout);
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	onFocus() {
		this.setState({ focus: true });
	}

	onChange(e) {
		const { value } = e.target;

		this.setState({
			isChange: !!value.length,
			inputValue: value,
		});

		clearTimeout(this.searchTimeout);
		this.searchTimeout = setTimeout(() => {
			this.props.getHints(value);
		}, 300);
	}

	onClick(e) {
		e.preventDefault();
		this.setState({ focus: true });
		this.inputEl.focus();
		const {	latestBlock } = this.props;

		clearTimeout(this.searchTimeout);
		this.changeLoadingStatus(this.state.inputValue, latestBlock);
	}

	onKeyPress(e) {
		const code = e.keyCode || e.which;
		const { value } = e.target;
		const {	latestBlock	} = this.props;

		if (KEY_CODE_ENTER === code) {
			clearTimeout(this.searchTimeout);
			this.changeLoadingStatus(value, latestBlock);
		}

		if (KEY_CODE_ESC === code) {
			this.inputEl.blur();
			this.setState({ focus: false });
		}
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.state.isActiveSmall && !this.wrapperRef.contains(event.target)) {
			this.setState({ isActiveSmall: false });
		}

		if (!this.wrapperRef.contains(event.target)) {
			this.setState({ focus: false });
			this.setState({ isChange: false });
		}
	}

	isSmallShow() {
		this.setState({ isActiveSmall: true });
		this.inputEl.focus();
	}

	cleareInput() {
		this.setState({
			inputValue: '',
			focus: false,
			isChange: false,
			isActiveSmall: false,
		});
	}

	changeLoadingStatus(value, latestBlock) {
		if (!this.state.inputValue || this.state.inputValue < 1 || this.state.inputValue > latestBlock) return;
		this.props.setLoading();
		this.props.getHints(value);
	}

	render() {

		const {
			focus, isChange, isActiveSmall,
		} = this.state;

		const {
			small, placeholder, white, withHelp, errorSearch,
		} = this.props;

		return (
			<div
				className={cn('input-search-block', { small, 'is-active-small': isActiveSmall || this.state.inputValue, white })}
				ref={this.setWrapperRef}
			>
				<div className={`input-container ${focus ? 'focus' : ''}`}>
					<a
						href=""
						className="icon"
						onClick={(e) => { e.preventDefault(); ((small) ? (this.isSmallShow()) : false); }}
					>
						<svg>
							<path fill="#686C86" d="M14.72 13.12l-3.54-3.54a6.12 6.12 0 10-1.6 1.6l3.53 3.55a1.14 1.14 0 001.6-1.6zm-12.45-7a3.85 3.85 0 117.7 0 3.85 3.85 0 01-7.7 0z" />
						</svg>
					</a>
					<div className="input-field">
						<input
							type="text"
							value={this.state.inputValue}
							placeholder={placeholder}
							onFocus={() => this.onFocus()}
							onChange={(e) => this.onChange(e)}
							onKeyDown={(e) => this.onKeyPress(e)}
							ref={(node) => { this.inputEl = node; }}
						/>
						<button tabIndex="0" className="close-icn" onClick={() => this.cleareInput()} />
					</div>
				</div>
				{
					(withHelp) && (
						(isChange || focus) && (
							<div className={cn('search-block-result', { 'no-results-wrap': errorSearch })}>
								{errorSearch && (
									<div className="element no-results">
										<div className="warn" />
										<div className="text">{errorSearch}</div>
									</div>
								)}
							</div>)
					)
				}
			</div>
		);
	}

}

SearchField.propTypes = {
	small: PropTypes.bool,
	white: PropTypes.bool,
	withHelp: PropTypes.bool,
	errorSearch: PropTypes.string,
	placeholder: PropTypes.string,
	getHints: PropTypes.func,
	latestBlock: PropTypes.number,
	setLoading: PropTypes.func,
};

SearchField.defaultProps = {
	small: false,
	white: false,
	withHelp: false,
	errorSearch: '',
	placeholder: '',
	getHints: () => {},
	latestBlock: '',
	setLoading: () => {},
};

export default SearchField;
