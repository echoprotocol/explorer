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
import QueryStringHelper from '../../helpers/QueryStringHelper';
import SsrHrefHelper from '../../helpers/SsrHrefHelper';

class Objects extends React.Component {

	constructor(props) {
		super(props);
		this.copy = this.copy.bind(this);
	}

	componentDidMount() {
		if (!this.props.data) {
			const id = QueryStringHelper.getObjectId(this.props.router.asPath.split('?')[1]);
			this.checkObject(id);
		}

	}

	componentDidUpdate(prevProps) {
		const id = QueryStringHelper.getObjectId(this.props.router.asPath.split('?')[1]);

		if (id) {
			this.props.setTitle(TITLE_TEMPLATES.OBJECT.replace(/id/, id));
		}

		if (prevProps.router.asPath !== this.props.router.asPath) {
			this.checkObject(id);
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
			<div className="inner-container object-view">
				<InnerHeader title={`Object ${QueryStringHelper.getObjectId(this.props.router.asPath.split('?')[1])}`} />
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
									const id = raw.substr(1, raw.length - 1 - 1);
									const as = URLHelper.createUrlById(id);
									const href = SsrHrefHelper.getHrefByObjectId(id);
									return (
										<Link href={href} as={as}>
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
	router: PropTypes.object.isRequired,
	data: PropTypes.any,
	setError: PropTypes.func,
	error: PropTypes.string,
	setTitle: PropTypes.func.isRequired,
	getObjectInfo: PropTypes.func.isRequired,
};

Objects.defaultProps = {
	data: null,
	setError: null,
	error: null,
};

Objects.getInitialProps = async ({ query, store, asPath }) => {
	let { id } = query;
	if (!id) {
		id = QueryStringHelper.getObjectId(asPath.split('?')[1]);
	}
	await store.dispatch(getObjectInfo(id));
	return { query: { id } };
};

export default Objects;
