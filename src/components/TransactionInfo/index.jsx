import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import copy from 'copy-to-clipboard';

import { OBJECTS_PATH, BLOCK_INFORMATION_PATH } from '../../constants/RouterConstants';
import FormatHelper from '../../helpers/FormatHelper';
import BreadCrumbs from '../../components/InformationBreadCrumbs';

class TransactionsInfo extends React.Component {

	componentDidMount() {
		this.props.getTransaction();
	}

	componentWillUnmount() {
		this.props.clearTransaction();
	}

	returnFunction() {
		this.props.history.push(BLOCK_INFORMATION_PATH.replace(/:round/, this.props.match.params.round));
	}

	renderOperationRow(key, value, opKey) {
		if (typeof value === 'object') {
			if (!value.link) {
				value = FormatHelper.formatAmount(value.amount, value.precision, value.symbol);
			} else {
				value = (<Link to={`${OBJECTS_PATH}?id=${value.link}`} className="blue">{value.value}</Link>);
			}
		}

		if (key === 'block') {
			value = (
				<Link to={BLOCK_INFORMATION_PATH.replace(/:round/, value)} className="blue">
					{FormatHelper.formatAmount(value, 0)}
				</Link>
			);
		}

		if (key === 'contract id') {
			// TODO link to contract page
			value = (<a href="" className="blue" onClick={(e) => e.preventDefault()}>{value}</a>);
		}

		return (
			<div className={classnames('row', { bytecode: key === 'bytecode' })} key={`${opKey}_${key}`}>
				<div className="title">{key}</div>
				<div className="value">
					{value}
					{key === 'bytecode' ? <button className="copy-bytecode" onClick={() => copy(value)}>Copy</button> : null}
				</div>
			</div>
		);
	}

	renderOperation(operation, index) {
		const opKey = `${operation.type}_${index}`;

		return (
			<div className="transaction-info-table" key={opKey}>
				{
					Object.entries(operation)
						.map(([key, value]) => this.renderOperationRow(key, value, opKey))
				}
			</div>
		);
	}

	render() {
		const { round, index } = this.props.match.params;
		const { operations } = this.props;

		return (
			<React.Fragment>
				<div className="table-container inner-information-container transaction-information">
					<BreadCrumbs title={`Transaction ${index} in Block ${FormatHelper.formatAmount(round, 0)}`} returnFunction={() => this.returnFunction} />
					{
						operations ?
							operations.map((op, i) => this.renderOperation(op, i)) : null
					}
				</div>
			</React.Fragment>
		);
	}

}

TransactionsInfo.propTypes = {
	match: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	operations: PropTypes.object,
	getTransaction: PropTypes.func.isRequired,
	clearTransaction: PropTypes.func.isRequired,
};

TransactionsInfo.defaultProps = {
	operations: null,
};

export default TransactionsInfo;
