import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ViewListPopover extends Component {

	constructor(props) {
		super(props);

		this.handleOutsideClick = this.handleOutsideClick.bind(this);

		this.state = {
			isOpen: false,
			query: '',
		};

		this.search = this.search.bind(this);

	}

	componentDidMount() {
		document.addEventListener('click', this.handleOutsideClick, false);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleOutsideClick, false);
	}

	onOpen() {
		this.setState({ isOpen: !this.state.isOpen });
	}

	handleOutsideClick(e) {
		if (this.state.isOpen && this.viewListBtn !== e.target && this.viewListMenu && !this.viewListMenu.contains(e.target)) {
			this.setState({ isOpen: false });
		}
	}

	search(e) {
		console.log(e);
		this.setState({
			query: e.target.value.trim(),
		});
	}

	render() {

		const { isOpen } = this.state;
		const { list } = this.props;

		return (
			<div className="view-list-container">
				<a
					href=""
					className={`view-list ${isOpen ? 'is-open' : ''}`}
					onClick={(e) => { e.preventDefault(); this.onOpen(); }}
					ref={(viewListBtn) => { this.viewListBtn = viewListBtn; }}
				>{!isOpen ? 'Show list' : 'Hide list'}
				</a>
				{
					(isOpen) && (
						<div className="view-list-menu" ref={(viewListMenu) => { this.viewListMenu = viewListMenu; }}>
							<div className="input-container">
								<input value={this.state.query} type="text" placeholder="Search by name" onChange={this.search} />
							</div>
							<div className="result">
								{list.filter(({ name }) => {
									console.log(name, this.state.query);
									return !this.state.query || (name && (name.search(new RegExp(this.state.query)) !== -1));
								}).map(({ name, to }) => (<Link to={to} key={name}>{name}</Link>))}
							</div>
						</div>
					)
				}
			</div>
		);
	}

}

ViewListPopover.propTypes = {
	list: PropTypes.array.isRequired,
};

export default ViewListPopover;
