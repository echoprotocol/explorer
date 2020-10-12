import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ModalBase from './ModalBase';
import AssetGraphic from '../AssetGraphic';
import cross from '../../public/images/icons/cross.svg';

class ModalIncentives extends React.PureComponent {

	render() {

		const data = [
			{ price: 9035200000000, date: '23-09-2020' },
			{ price: 41570000010, date: '24-09-2020' },
			{ price: 100046345610020, date: '25-09-2020' },
			{ price: 95020300000000, date: '28-09-2020' },
			{ price: 5000000000, date: '29-09-2020' },
			{ price: 5500000000, date: '30-09-2020' },
			{ price: 5000000030, date: '01-10-2020' },
			{ price: 7600012000, date: '02-10-2020' },
			{ price: 10100000000, date: '05-10-2020' },
			{ price: 11310000000, date: '06-10-2020' },
			{ price: 77945300012, date: '07-10-2020' },
			{ price: 10100000000, date: '08-10-2020' },
			{ price: 5400000000, date: '09-10-2020' },
			{ price: 10000000000, date: '12-10-2020' },
		];

		return (
			<ModalBase onClose={() => this.props.onClose()} >
				<section className={classnames('modal', 'modal-incentives')}>
					<div className="modal-header">
						<button className="modal-close-btn" onClick={() => this.props.onClose()}>
							<img className="icon" src={cross} alt="error" />
						</button>
					</div>
					<AssetGraphic precision={1} data={data} Ytick={false} />
					<div className="modal-footer" />
				</section>
			</ModalBase>
		);
	}

}


ModalIncentives.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export default ModalIncentives;
