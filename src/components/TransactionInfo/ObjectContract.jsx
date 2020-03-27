import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';

class ObjectContract extends React.Component {

	render() {
		const bytecode = '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d76040805190810160405280601a81526020017f4578616d76040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920546f6b656';

		return (
			<div className="fold-operation-info">
				<div className="fold-title">Object: contract</div>
				<div className="operation-detail-table">
					<div className="od-row">
						<div className="od-col">ID:</div>
						<div className="od-col">
							<Link to="/">1.14.2</Link>
						</div>
					</div>
					<div className="od-row">
						<div className="od-col">Contract type:</div>
						<div className="od-col">EVM, ERC20</div>
					</div>
					<div className="od-row">
						<div className="od-col">Eth Accuracy:</div>
						<div className="od-col">Activated</div>
					</div>
					<div className="od-row">
						<div className="od-col">Authority list:</div>
						<div className="od-col">
							<div className="authority">
								<div className="title">Accounts:</div>
								<ul className="accounts">
									<li>
										<Link className="avatar-wrap" to="/">
											<Avatar accountName="Homersimpson3423" />
											<span>Homersimpson3423</span>
										</Link>
									</li>
									<li>
										<Link className="avatar-wrap" to="/">
											<Avatar accountName="Homersimp" />
											<span>Homersimp</span>
										</Link>
									</li>
								</ul>
								<div className="title">Keys:</div>
								<ul className="keys">
									<li>ECHODnJr1ZNfYq2nTp3S9GCU1azAwDEBJkum1PSVKppSJdCU</li>
									<li>ECHODnJr1ZNfYq2nTd43tGCU1azAwDEBJkum1PSVgv4hSJdf13</li>
									<li>ECHODnJr1ZNfYq2nTp3S9GCU1adgh4edfhBJkum1PSVKppSJdf9</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="od-row bytecode">
						<div className="od-col">
							Byte code:
							<button className="copy-bytecode">Copy code</button>
						</div>
						<div className="od-col">
							<div className="mono">
								{ bytecode.length > 410 ?
									`${bytecode.slice(0, 410)}..` : bytecode
								}
							</div>
							<button className="text-button">Expand</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default ObjectContract;
