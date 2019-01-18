import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import { isString } from 'lodash';
import copy from 'copy-to-clipboard';
import RecentBlockSidebar from '../../containers/RecentBlockSection/RecentBlockSidebar';
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
			base00: '#ebeaee', // Background color
			base01: '#383830',
			base02: '#49483e',
			base03: '#7a7664;',
			base04: '#7a7664',
			base05: '#f8f8f2',
			base06: '#f5f4f1',
			base07: '#f9f8f5',
			base08: '#f92672',
			base09: '#fd971f',
			base0A: '#f4bf75',
			base0B: '#7a7664',
			base0C: '#a1efe4',
			base0D: '#0c7f95',
			base0E: '#ae81ff',
			base0F: '#cc6633',
			// #ebeaee
		};

		if (!data) {
			return null;
		}

		return (
			<div className="recent-block-section object-view">
				<div className="wrap">
					<div className="table-container object-view">
						<h2>Object 1.16.2345</h2>
						<div className="json-tree-container">
							<JSONTree
								theme={theme}
								invertTheme={false}
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
							<button className="copy-bytecode" onClick={this.copy}>Copy</button>

						</div>
					</div>
					<RecentBlockSidebar />
				</div>
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
