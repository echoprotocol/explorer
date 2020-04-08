import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';

export default class extends Document {

	static async getInitialProps(...args) {
		const documentProps = await super.getInitialProps(...args);
		return { ...documentProps, helmet: Helmet.renderStatic() };
	}

	get helmetHtmlAttrComponents() {
		return this.props.helmet.htmlAttributes.toComponent();
	}

	get helmetBodyAttrComponents() {
		return this.props.helmet.bodyAttributes.toComponent();
	}

	get helmetHeadComponents() {
		return Object.keys(this.props.helmet)
			.filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
			.map((el) => this.props.helmet[el].toComponent());
	}

	render() {
		return (
			<html lang="en" {...this.helmetHtmlAttrComponents}>
				<Head>
					{this.helmetHeadComponents}
					{/* eslint-disable-next-line global-require */}
					<link rel="icon" type="image/x-icon" href={require('../public/favicon.ico')} />
				</Head>
				<body {...this.helmetBodyAttrComponents}>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}

}