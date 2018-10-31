import React from 'react';

class LoadMoreBtn extends React.Component {

	constructor() {
		super();

		this.state = {
			loading: false,
		};
	}

	isLoading() {
		this.setState({ loading: true });
	}

	render() {

		const { loading } = this.state;

		return (
			<React.Fragment>
				<div className="load-more-container">
					{
						loading ? (
							<div className="loader" />
						) : (
							<a href="" className="load-more" onClick={(e) => { e.preventDefault(); this.isLoading(); }}>
            Load more blocks
								<div className="icon">
									<svg
										width="8px"
										height="8px"
									>
										<path
											fillRule="evenodd"
											opacity="0.871"
											fill="rgb(130, 139, 149)"
											d="M6.886,4.815 L3.931,7.777 C3.844,7.908 3.703,8.000 3.534,8.000 L3.529,8.000 C3.524,8.000 3.521,7.995 3.516,7.995 C3.394,7.995 3.272,7.948 3.179,7.855 L0.146,4.815 C-0.041,4.629 -0.041,4.326 0.146,4.140 C0.332,3.953 0.634,3.953 0.820,4.140 L3.045,6.369 L3.045,0.484 C3.045,0.217 3.262,-0.000 3.529,-0.000 L3.534,-0.000 C3.801,-0.000 4.018,0.217 4.018,0.484 L4.018,6.339 L6.212,4.140 C6.399,3.953 6.700,3.953 6.886,4.140 C7.073,4.326 7.073,4.629 6.886,4.815 Z"
										/>
									</svg>
								</div>
							</a>
						)
					}
				</div>
			</React.Fragment>
		);
	}

}

export default LoadMoreBtn;
