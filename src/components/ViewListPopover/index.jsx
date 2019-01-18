import React, { Component } from 'react';

class ViewListPopover extends Component {

	constructor(props) {
		super(props);

		this.handleOutsideClick = this.handleOutsideClick.bind(this);

		this.state = {
			isOpen: false,
		};
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

	render() {

		const { isOpen } = this.state;

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
								<input type="text" placeholder="Search by name" />
							</div>
							<div className="result">
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
								<a href="" onClick={(e) => e.preventDefault()}>gauto10</a>
							</div>
						</div>
					)
				}
			</div>
		);
	}

}

export default ViewListPopover;
