import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import { isString } from 'lodash';
import copy from 'copy-to-clipboard';

class Objects extends React.Component {

	constructor(props) {
		super(props);
		this.copy = this.copy.bind(this);
	}

	componentDidMount() {

		const regExp = /^"\d+\.\d+\.\d+"$/;

		if (0 && this.props.match.params.objectId.search(regExp) === -1) { // TODO::
			this.props.setError('Object id is Invalid');
		} else {
			this.props.getObjectInfo('1.3.0');
		}

	}

	componentWillUnmount() {
		this.props.setError(null);
	}

	copy() {
		copy(JSON.stringify(this.props.data));
	}

	render() {

		const { data, error } = this.props;

		if (error) {
			return (
				<div>
					{error}
				</div>
			);
		}

		const theme = {
			scheme: 'monokai',
			author: 'wimer hazenberg (http://www.monokai.nl)',
			base00: '#272822',
			base01: '#383830',
			base02: '#49483e',
			base03: '#75715e',
			base04: '#a59f85',
			base05: '#f8f8f2',
			base06: '#f5f4f1',
			base07: '#f9f8f5',
			base08: '#f92672',
			base09: '#fd971f',
			base0A: '#f4bf75',
			base0B: '#a6e22e',
			base0C: '#a1efe4',
			base0D: '#66d9ef',
			base0E: '#ae81ff',
			base0F: '#cc6633',
		};

		if (!data) {
			return null;
		}

		return (
			<div>
				<button onClick={this.copy}>Button</button>
				<JSONTree
					theme={theme}
					invertTheme
					valueRenderer={(raw) => {

						const regExp = /^"\d+\.\d+\.\d+"$/;

						return (raw && isString(raw) && (raw.search(regExp) !== -1)) ? <a href={`/objects/${raw.substr(1, raw.length - 1 - 1)}`}>{raw}</a> : raw;

					}}
					data={data}
				/>
			</div>
		);
	}

}

Objects.propTypes = {
	data: PropTypes.object,
	getObjectInfo: PropTypes.func,
	setError: PropTypes.func,
	error: PropTypes.object,
	match: PropTypes.object,
};

Objects.defaultProps = {
	data: null,
	getObjectInfo: null,
	setError: null,
	error: null,
	match: null,
};

export default Objects;
