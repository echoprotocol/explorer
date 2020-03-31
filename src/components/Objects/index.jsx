import React from 'react';
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree';
import { isString } from 'lodash';
import Link from 'next/link';
import copy from 'copy-to-clipboard';
import InnerHeader from '../InnerHeader';
import URLHelper from '../../helpers/URLHelper';

import { TITLE_TEMPLATES } from '../../constants/GlobalConstants';
import { getObjectInfo } from '../../actions/ObjectsActions';
import { OBJECTS_PATH } from '../../constants/RouterConstants';
import QueryStringHelper from '../../helpers/QueryStringHelper';

class Objects extends React.Component {

	constructor(props) {
		super(props);
		this.copy = this.copy.bind(this);
	}

	static async getInitialProps({ query, store, asPath }) {
		let { id } = query;
		if (!id) {
			id = QueryStringHelper.getObjectId(asPath.split('?')[1]);
		}
		await store.dispatch(getObjectInfo(id));
		return { query: { id } };
	}

	componentDidMount() {
		// this.checkObject();
	}

	componentDidUpdate(prevProps) {
		if (this.props.query.id) {
			this.props.setTitle(TITLE_TEMPLATES.OBJECT.replace(/id/, this.props.query.id));
		}

		if (this.props.query.id && prevProps.query.id !== this.props.query.id) {
			this.checkObject(this.props.query.id);
		}
	}

	componentWillUnmount() {
		this.props.setError(null);
	}

	checkObject(id) {
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

		const theme = {
			base00: '#ebeaee', // Background color
			base01: '#383830',
			base02: '#49483e',
			base03: '#7a7664',
			base04: '#7a7664',
			base05: '#f8f8f2',
			base06: '#f5f4f1',
			base07: '#f9f8f5',
			base08: '#f92672',
			base09: '#fd971f',
			base0A: '#f4bf75',
			base0B: '#7a7664',
			base0C: '#a1efe4',
			base0D: '#377D92',
			base0E: '#ae81ff',
			base0F: '#cc6633',
		};

		return (
			<div className="inner-information-container object-view">
				<InnerHeader title={`Object ${this.props.query.id}`} />
				{error ?
					<div className="json-tree-container">
						{error}
					</div>
					:
					<div className="json-tree-container">
						<JSONTree
							theme={theme}
							invertTheme={false}
							valueRenderer={(raw) => {

								const idRegExp = /^"\d+\.\d+\.\d+"$/;

								if ((raw && isString(raw) && (raw.search(idRegExp) !== -1))) {

									const url = URLHelper.createUrlById(raw.substr(1, raw.length - 1 - 1));

									return (
										<Link href={OBJECTS_PATH} as={url}>
											<a>{raw}</a>
										</Link>
									);
								}

								return raw;

							}}
							data={data || {}}
						/>
						<button className="copy-bytecode" onClick={this.copy}>Copy</button>
					</div>
				}

			</div>
		);
	}

}

Objects.propTypes = {
	query: PropTypes.object.isRequired,
	data: PropTypes.any,
	getObjectInfo: PropTypes.func,
	setError: PropTypes.func,
	error: PropTypes.string,
	setTitle: PropTypes.func.isRequired,
};

Objects.defaultProps = {
	data: null,
	getObjectInfo: null,
	setError: null,
	error: null,
};

export default Objects;
