import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { NONE_SYMBOL } from '../../constants/GlobalConstants';
import FormatHelper from '../../helpers/FormatHelper';
import Avatar from '../Avatar';


import URLHelper from '../../helpers/URLHelper';

class ContractDescription extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showMore: false,
		};
	}

	render() {
		const { showMore } = this.state;
		const { data } = this.props;
		let date = NONE_SYMBOL;
		let time = '';
		if (!data.get('error')) {
			const contractCreationTime = FormatHelper.timestampToContractCreationTime(data.get('createdAt'));
			({ date, time } = contractCreationTime);
		}
		return (
			<React.Fragment>
				<div className="created-info">
					<div className="plain-text">Created</div>
					<span className="date">{date}</span>{' '}
					<span className="time">{time}</span>{' '}
					<div className="plain-text">by</div>
					<span className="no-wrap">
						<Avatar accountName={data.getIn(['owner', 'name'])} />
						<Link className="link" to={URLHelper.createAccountUrl(data.getIn(['owner', 'name']))} >{data.getIn(['owner', 'name'])}</Link>
					</span>
				</div>
				{data.get('description') && (
					<React.Fragment>
						<div className={classnames('description', { short: !showMore })}>
							{data.get('description')}
						</div>
						<button className="text-button" onClick={() => this.setState({ showMore: !showMore })}>
							{!showMore ? 'Read full description' : 'Show less'}
						</button>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}

}

ContractDescription.propTypes = {
	data: PropTypes.object.isRequired,
};

ContractDescription.defaultProps = {};

export default ContractDescription;
