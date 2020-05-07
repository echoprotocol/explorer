/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Dropdown } from 'semantic-ui-react';
import Link from 'next/link';
import Router from 'next/router';
import { DebounceInput } from 'react-debounce-input';

import SsrHrefHelper from '../../helpers/SsrHrefHelper';

import { KEY_CODES } from '../../constants/GlobalConstants';
import { DEBOUNCE_TIMEOUT, DEFAULT_ERROR_SEARCH } from '../../constants/SearchConstants';

class SearchField extends React.Component {

	constructor() {
		super();

		this.state = {
			focus: false,
			isChange: false,
			isActiveSmall: false,
			inputValue: '',
			to: '',
			href: '',
		};
		this.timeoutSearch = null;
		this.timeoutPressEnter = null;
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside);
	}

	componentWillUnmount() {
		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}
		if (this.timeoutPressEnter) {
			clearTimeout(this.timeoutPressEnter);
		}
		document.removeEventListener('mousedown', this.handleClickOutside);
	}

	onFocus() {
		this.setState({ focus: true });
	}

	onChangeDropdown(e, data) {
		const code = e.keyCode || e.which;

		const option = data.options.find(({ value }) => value === data.value);

		if ([KEY_CODES.ARROW_UP, KEY_CODES.ARROW_DOWN].includes(code)) {
			this.setState({ to: data.value, href: option.href });
		} else {
			this.setState({
				focus: false,
				isChange: false,
				to: data.value,
				href: option.href,
			});
		}
	}

	onChange(e) {
		const { value } = e.target;

		this.setState({
			isChange: !!value.length,
			inputValue: value,
		});

		if (this.timeoutSearch) {
			clearTimeout(this.timeoutSearch);
		}

		this.timeoutSearch = setTimeout(() => {
			this.props.getHints(value);
		}, 300);
	}

	onClick(e) {
		e.preventDefault();

		this.setState({ focus: true });
		this.inputEl.focus();
	}

	onKeyPress(e) {
		const { loadingSearch, hints } = this.props;
		const { inputValue, to } = this.state;
		const code = e.keyCode || e.which;

		if (this.timeoutPressEnter) {
			clearTimeout(this.timeoutPressEnter);
		}
		if (!loadingSearch && KEY_CODES.ENTER_CODE === code && inputValue && to) {
			this.timeoutPressEnter = setTimeout(() => {
				if (this.props.hints.length !== 0 && hints.find((el) => el.value === inputValue)) {
					Router.push(this.state.href, this.state.to);
					this.setState({ focus: false, isChange: false });
					this.inputEl.blur();
				}
			}, 300);
		}

		if (KEY_CODES.ESC_CODE === code) {
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

	clearInput() {
		this.setState({
			inputValue: '',
			focus: false,
			isChange: false,
			isActiveSmall: false,
			to: '',
		});
		this.props.getHints();
	}

	renderIcon(active) {
		const { loadingSearch } = this.props;

		return (
			loadingSearch ?
				<span className="search-loading" /> :
				<button tabIndex={active ? 0 : -1} className="close-icn" onClick={() => this.clearInput()} />
		);

	}

	render() {

		const {
			focus, isChange, isActiveSmall, inputValue,
		} = this.state;

		const {
			placeholder, white, withHelp, hints, errorSearch,
		} = this.props;

		const options = hints
			.map(({
				section, prefix, value, to, postfix,
			}, i) => ({
				key: i,
				value: to,
				href: SsrHrefHelper.getHrefByTypeSection(section),
				content: (
					<Link key={to} href={SsrHrefHelper.getHrefByTypeSection(section)} as={to} >
						<div className="element">
							<div className="section-name">{section}</div>
							<div className="value">{prefix}<span className="select">{value}</span>{postfix}</div>
						</div>
					</Link>
				),
			}));

		if (errorSearch) {
			options.push({
				key: options.length + 1,
				selected: false,
				value: '',
				content: (
					<div className="element no-results">
						<div className="warn" />
						<div className="text">{DEFAULT_ERROR_SEARCH}</div>
					</div>
				),
			});
		}

		return (
			<div
				className={classnames('input-search-block', { active: (isActiveSmall || inputValue), white })}
				ref={this.setWrapperRef}
			>
				<div className={classnames('input-container', { focus })}>
					<a
						href=""
						className="icon"
						onClick={(e) => { e.preventDefault(); this.isSmallShow(); }}
					>
						<svg>
							<path fill="#CCCCD4" d="M14.72 13.12l-3.54-3.54a6.12 6.12 0 10-1.6 1.6l3.53 3.55a1.14 1.14 0 001.6-1.6zm-12.45-7a3.85 3.85 0 117.7 0 3.85 3.85 0 01-7.7 0z" />
						</svg>
					</a>
					<div className="input-field">
						<DebounceInput
							type="text"
							value={inputValue}
							placeholder={placeholder}
							onFocus={() => this.onFocus()}
							onChange={(e) => this.onChange(e)}
							onKeyDown={(e) => this.onKeyPress(e)}
							debounceTimeout={DEBOUNCE_TIMEOUT}
							inputRef={(node) => { this.inputEl = node; }}
						/>
						{ this.renderIcon(isActiveSmall || inputValue) }
					</div>
				</div>

				{ (withHelp) && ((isChange || focus) && (
					<div className="search-block-result">
						<Dropdown
							options={options}
							open
							onChange={(event, data) => this.onChangeDropdown(event, data)}
						/>
					</div>
				))}
			</div>
		);
	}

}

SearchField.propTypes = {
	// small: PropTypes.bool,
	loadingSearch: PropTypes.bool,
	errorSearch: PropTypes.string,
	placeholder: PropTypes.string,
	white: PropTypes.bool,
	withHelp: PropTypes.bool,
	hints: PropTypes.array,
	getHints: PropTypes.func,
};

SearchField.defaultProps = {
	loadingSearch: false,
	errorSearch: '',
	placeholder: '',
	white: false,
	withHelp: false,
	hints: [],
	getHints: () => {},
};

export default SearchField;
