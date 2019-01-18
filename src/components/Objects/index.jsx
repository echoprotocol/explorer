import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import { isString } from 'lodash';
import copy from 'copy-to-clipboard';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

class Objects extends React.Component {

	constructor(props) {
		super(props);
		this.copy = this.copy.bind(this);
		this.state = {
			id: this.getId(this.props),
		};
	}

	componentDidMount() {
		this.checkObject();
	}

	componentWillReceiveProps(nextProps) {

		const newId = this.getId(nextProps);

		if (newId !== this.state.id) {

			this.setState({
				id: newId,
			}, () => {
				this.checkObject();
			});

		}
	}

	componentWillUnmount() {
		this.props.setError(null);
	}

	getId(props) {

		const parsed = queryString.parse(props.location.search);
		const regExp = /^\d+\.\d+\.\d+$/;

		if (!parsed.id || parsed.id.search(regExp) === -1) {
			return null;
		}

		return parsed.id;
	}

	checkObject() {
		const { id } = this.state;

		if (!id) {
			this.props.setError('Object id is Invalid');
		} else {
			this.props.getObjectInfo(id);
		}
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

						return (raw && isString(raw) && (raw.search(regExp) !== -1)) ?
							<Link
								to={`/objects?id=${raw.substr(1, raw.length - 1 - 1)}`}
								className="blue"
							>
								{raw}
							</Link> : raw;

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
	error: PropTypes.string,
};

Objects.defaultProps = {
	data: null,
	getObjectInfo: null,
	setError: null,
	error: null,
};

export default Objects;
