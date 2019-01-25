import React from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';

import { BYTECODE_SYMBOLS_LENGTH } from '../../constants/GlobalConstants';

class ContractBytecode extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			loadMore: false,
		};
	}

	onToggleLoadMore(e) {
		e.preventDefault();

		this.setState({ loadMore: !this.state.loadMore });
	}

	render() {
		const { bytecode } = this.props;
		const { loadMore } = this.state;

		const value = bytecode && bytecode.length > BYTECODE_SYMBOLS_LENGTH && !loadMore ?
			bytecode.slice(0, BYTECODE_SYMBOLS_LENGTH - 3).concat('...') : bytecode;

		return (
			<div className="contract-bytecode-panel">
				<div className="row">
					<div className="left-column">
						Bytecode
					</div>
					<div className="right-column">
						{
							bytecode ?
								<React.Fragment>
									<div className="text-block">{value}</div>
									{
										bytecode.length > BYTECODE_SYMBOLS_LENGTH && !loadMore ?
											<a href="" className="load-more" onClick={(e) => this.onToggleLoadMore(e)}>
												{loadMore ? 'Collapse All' : 'Show All'}
											</a> : null
									}
									<button className="copy-bytecode" onClick={() => copy(bytecode)}>Copy</button>
								</React.Fragment> :
								<div className="text-block">None</div>
						}
					</div>
				</div>
			</div>
		);
	}

}

ContractBytecode.propTypes = {
	bytecode: PropTypes.string,
};

ContractBytecode.defaultProps = {
	bytecode: null,
};

export default ContractBytecode;
