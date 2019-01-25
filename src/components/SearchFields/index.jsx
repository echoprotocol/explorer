/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';


import { KEY_CODE_ENTER, KEY_CODE_ESC } from '../../constants/GlobalConstants';
import { DEBOUNCE_TIMEOUT } from '../../constants/SearchConstants';
import { NOT_FOUND_PATH } from '../../constants/RouterConstants';


class SearchField extends React.Component {

	constructor() {
		super();

		this.state = {
			focus: false,
			isChange: false,
			isActiveSmall: false,
			inputValue: '',
			to: '',
		};

		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	onFocus() {
		this.setState({ focus: true });
	}

	onChangeDropdown(data) {
		this.setState({ to: data.value });
	}

	onChange(e) {
		const { value } = e.target;

		this.setState({
			isChange: true,
			inputValue: value,
		});

		this.props.getHints(value);
	}

	onClick(e) {
		e.preventDefault();

		this.setState({ focus: true });
		this.inputEl.focus();
	}

	onKeyPress(e) {
		const code = e.keyCode || e.which;
		if (KEY_CODE_ENTER === code) {
			if (this.state.inputValue && this.state.to && this.props.hints.length !== 0) {
				this.props.history.push(this.state.to);
				this.setState({ focus: false, isChange: false });
				this.inputEl.blur();
			} else if (this.props.hints.length === 0) {
				this.props.history.push(NOT_FOUND_PATH);
				return;
			}
		}

		if (KEY_CODE_ESC === code) {
			this.inputEl.blur();
			this.setState({ focus: false, isChange: false });
		}
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	blurInput() {
		this.setState({
			focus: false,
			isChange: false,
		});
		this.inputEl.blur();
	}

	handleClickOutside(event) {
		if (this.state.isActiveSmall && !this.wrapperRef.contains(event.target)) {
			this.setState({ isActiveSmall: false });
		}

		if (!this.wrapperRef.contains(event.target)) {
			this.setState({ focus: false, isChange: false });
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
			to: '',
		});
		this.props.getHints();
	}

	render() {

		const {
			focus, isChange, isActiveSmall,
		} = this.state;

		const {
			small, placeholder, white, withHelp, goToBlock, hints,
		} = this.props;

		const options = hints
			.map(({
				section, prefix, value, to, postfix,
			}, i) => ({
				key: i,
				value: to,
				content: (
					<Link key={to} to={to} className="element" onClick={() => this.blurInput()} >
						<div className="section-name">{section}</div>
						<div className="value">{prefix}<span className="select">{value}</span>{postfix}</div>
					</Link>
				),
			}));

		return (
			<div
				className={classnames('input-search-block', {
					small, 'is-active-small': (isActiveSmall || this.state.inputValue), white, 'go-to-block': goToBlock,
				})}
				ref={this.setWrapperRef}
			>
				<div className={classnames('input-container', { focus })}>
					{
						(!goToBlock) && (
							<a
								href=""
								className="icon"
								onClick={(e) => { e.preventDefault(); ((small) ? (this.isSmallShow()) : false); }}
							>
								<svg>
									<path
										fillRule="evenodd"
										fill="rgb(104, 108, 134)"
										d="M14.716,13.122 L11.179,9.575 C13.082,6.782 12.362,2.974 9.571,1.069 C6.780,-0.835 2.974,-0.114 1.072,2.679 C-0.831,5.473 -0.111,9.281 2.680,11.185 C4.759,12.603 7.492,12.603 9.571,11.185 L13.113,14.726 C13.590,15.135 14.308,15.079 14.716,14.602 C15.080,14.176 15.080,13.548 14.716,13.122 ZM2.272,6.122 C2.272,3.995 3.995,2.271 6.120,2.271 C8.246,2.271 9.969,3.995 9.969,6.122 C9.969,8.249 8.246,9.973 6.120,9.973 C3.996,9.970 2.275,8.248 2.272,6.122 Z"
									/>
								</svg>
							</a>
						)
					}
					<div className="input-field">
						<DebounceInput
							type="text"
							value={this.state.inputValue}
							placeholder={placeholder}
							onFocus={() => this.onFocus()}
							onChange={(e) => this.onChange(e)}
							onKeyDown={(e) => this.onKeyPress(e)}
							debounceTimeout={DEBOUNCE_TIMEOUT}
							inputRef={(node) => { this.inputEl = node; }}
						/>
						{
							(!goToBlock) ? (
								<button tabIndex="0" className="close-icn" onClick={() => this.cleareInput()} />
							) : (
								<button tabIndex="0" className="g-t-btn" onClick={(e) => this.onClick(e)} />
							)
						}
					</div>
				</div>

				{
					(withHelp) && (
						(isChange || focus) && (
							<div className="search-block-result">
								<Dropdown
									options={options}
									open
									onChange={(even, data) => this.onChangeDropdown(data)}
								/>
							</div>
						)
					)
				}
			</div>
		);
	}

}

SearchField.propTypes = {
	small: PropTypes.bool,
	placeholder: PropTypes.string,
	white: PropTypes.bool,
	withHelp: PropTypes.bool,
	goToBlock: PropTypes.bool,
	hints: PropTypes.array,
	getHints: PropTypes.func,
	history: PropTypes.object,
};

SearchField.defaultProps = {
	small: false,
	placeholder: '',
	white: false,
	withHelp: false,
	hints: [],
	goToBlock: null,
	history: {},
	getHints: () => {},
};

export default SearchField;
