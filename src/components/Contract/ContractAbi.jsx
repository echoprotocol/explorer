import React from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import { setAbi } from '../../api/ContractApi';

require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class ContractAbi extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			hasABI: true,
			ABI:
			`[
    {
        "constant": false,
        "inputs": [
            {
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": true,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "Election",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "votedEvent",
        "type": "event"
    }
]`,
		};
	}

	uploadFile(event) {
		const file = event.target.files[0];

		if (file) {
			const data = new FileReader();
			data.onload = (e) => {
				// console.log(e.target.result);
				setAbi('1.14.13', JSON.parse(e.target.result));
			};
			data.readAsText(file);
		}
	}

	renderWhithoutABI() {
		return (
			<React.Fragment>
				<div className="abi-info">
					Please, be aware. This contract has not been verified. <span className="warn"> ABI can not be fully trusted.</span>
				</div>
				<div className="action-button-wrap">
					<label className="action-button" htmlFor="upload-abi">Upload ABI</label>
				</div>
			</React.Fragment>
		);
	}
	renderWithABI() {
		const { ABI } = this.state;
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};
		return (
			<React.Fragment>

				<div className="abi-info">
					Please, be aware. This contract has not been verified. <span className="warn"> ABI can not be fully trusted.</span>
				</div>

				<div className="line">
					<div className="action-button-wrap">
						<label className="action-button" htmlFor="upload-abi">Upload new ABI</label>
					</div>
					<button className="copy-button">Copy code</button>
				</div>

				{/* If code-block readonly add class uncontrolled */}
				<div className="code-block uncontrolled">
					<CodeMirror
						value={ABI}
						options={CODEMIRROR_OPTIONS}
					/>
				</div>
			</React.Fragment>
		);
	}

	render() {
		const { hasABI } = this.state;
		return (
			<div className="contract-abi-panel">
				<input
					type="file"
					name="upload-abi"
					id="upload-abi"
					className="hidden"
					onChange={this.uploadFile}
				/>

				{
					hasABI ? this.renderWithABI() : this.renderWhithoutABI()
				}


			</div>
		);
	}

}

ContractAbi.propTypes = {
};

ContractAbi.defaultProps = {
};

export default ContractAbi;
