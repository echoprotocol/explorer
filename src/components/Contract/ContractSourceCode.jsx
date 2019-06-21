import React from 'react';

import { Controlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/xml/xml.js');
require('codemirror/mode/javascript/javascript.js');

class ContractSourceCode extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value:
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

	render() {
		const CODEMIRROR_OPTIONS = {
			mode: 'javascript',
			lineNumbers: true,
		};
		return (
			<div className="contract-source-code-panel">

				<div className="line">
					<div className="action-button-wrap">
						<button className="action-button">Copy code</button>
					</div>
				</div>

				<div className="code-block">
					<CodeMirror
						value={this.state.value}
						options={CODEMIRROR_OPTIONS}
						onBeforeChange={(editor, data, value) => {
							this.setState({ value });
						}}
					/>
				</div>

			</div>
		);
	}

}

ContractSourceCode.propTypes = {
};

ContractSourceCode.defaultProps = {
};

export default ContractSourceCode;
