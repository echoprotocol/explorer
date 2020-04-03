import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { SIZES_PER_PAGE } from '../../constants/TableConstants';
import Input from '../Input';
import Button from '../Button';
import { KEY_CODE_ENTER } from '../../constants/GlobalConstants';
import TypesHelper from '../../helpers/TypesHelper';

class OperationsPagination extends React.Component {

	constructor() {
		super();
		this.state = {
			inputValueCurrentPage: 1,
		};
	}

	componentDidUpdate(prevProps) {
		if (prevProps.currentPage !== this.props.currentPage) {
			this.onChange(this.props.currentPage);
		}
	}

	onChange(value) {
		this.setState({
			inputValueCurrentPage: value,
		});
	}

	onKeyPress(e, totalPages) {
		const code = e.keyCode || e.which;
		const { value } = e.target;

		if (KEY_CODE_ENTER === code) {
			if (TypesHelper.isStringNumber(value) && value > 0 && value < totalPages + 1) {
				this.props.onChangeCurrentPage(value);
			}
		}
	}

	render() {
		const { sizePerPage, currentPage, totalDataSize } = this.props;
		const totalPages = Math.ceil(totalDataSize / sizePerPage);
		const index = SIZES_PER_PAGE.find((size) => size < totalDataSize + 1);

		return (
			<div className="operations-pagination">
				<div className="pg-nav-1">
					<div className="pg-caption">Operations per page:</div>
					{SIZES_PER_PAGE.slice(0, index - 1).map((size) => (
						<button
							key={size}
							onClick={() => this.props.onChangeSizePerPage(size)}
							className={cn('pg-page-btn', { active: size === sizePerPage })}
						>
							{size}
						</button>
					))}
				</div>
				<div className="pg-nav-2">
					<div className="pg-caption">Page:</div>
					<Input
						name="pg-input"
						className="pg-input"
						placeholder="page"
						value={this.state.inputValueCurrentPage.toString()}
						onChange={(e) => this.onChange(e.target.value)}
						onKeyDown={(e) => this.onKeyPress(e, totalPages)}
					/>
					<div className="pg-caption">out of <a href="/">{totalPages}</a></div>
				</div>
				<div className="pg-nav-3">
					<Button className="primary-btn" disabled={currentPage === 1} onClick={() => this.props.onChangeCurrentPage(currentPage - 1)}>
						<div className="pg-arrow">
							<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 2.5L0 5V0l4 2.5z" />
							</svg>
							<div className="pg-arrow-caption">
								Previous
							</div>
						</div>
					</Button>
					<Button className="primary-btn" disabled={totalPages === currentPage} onClick={() => this.props.onChangeCurrentPage(currentPage + 1)}>
						<div className="pg-arrow">
							<div className="pg-arrow-caption">
								Next
							</div>
							<svg width="4" height="5" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M4 2.5L0 5V0l4 2.5z" />
							</svg>
						</div>
					</Button>
				</div>
			</div>
		);
	}

}

OperationsPagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	sizePerPage: PropTypes.number.isRequired,
	totalDataSize: PropTypes.number.isRequired,
	onChangeCurrentPage: PropTypes.func.isRequired,
	onChangeSizePerPage: PropTypes.func.isRequired,
};

OperationsPagination.defaultProps = {};

export default OperationsPagination;
