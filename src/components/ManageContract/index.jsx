import React from 'react';
import Dropzone from 'react-dropzone';
import BackwardIcon from '../BackwardIcon';

import Avatar from '../Avatar';

class ManageContract extends React.Component {

	render() {

		return (
			<div className="table-container inner-information-container inner-page with-d-table">
				<div className="backwards">
					<a
						href=""
						className="backwards-link"
						onClick={(e) => { e.preventDefault(); }}
					>
						<BackwardIcon />
					</a>
					<div className="account-page-t-block">

						<div className="icon" />

						<div className="title">Manage contract 1.16.1231</div>
					</div>
				</div>

				<div className="page-helper-section">
					<div className="page-helper-info">
						<div className="content">
							<span className="plain-text">Only {' '}</span>
							<span className="no-wrap">
								<Avatar accountName="Homersimpson3342" />
								<a className="link" href="">Homersimpson3342</a>
							</span>
							<span className="plain-text">
								{' '} can manage this contract.
							Before updating contract info you need to verify your authority via {' '}
							</span>
							<span className="no-wrap">
								<a href="" className="link">Bridge</a>{' '}
								<span className="brifge-logo">s</span>
							</span>
						</div>
					</div>
					<div className="form">
						<div className="row">
							<div className="field-label">Contract name:</div>
							<div className="field-wrap">
								<div className="field">
									<input placeholder="Contract name" type="text" />
									{
										true && <div className="error">Some error</div>
									}
								</div>
							</div>
						</div>
						<div className="row">
							<div className="field-label">Contract description:</div>
							<div className="field-wrap">
								<div className="field">
									<textarea placeholder="Contract description" />
									{
										false && <div className="error">Some error</div>
									}

								</div>
								<div className="hint">123 of 256 symbols used</div>
							</div>
						</div>
						<div className="row">
							<div className="field-label">Contract icon:</div>
							<div className="field-wrap">
								<div className="field">
									<div className="drop-area-wrap">
										<Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
											{({ getRootProps, getInputProps }) => (
												<div className="drop-area loading" {...getRootProps()}>
													<input {...getInputProps()} />
													<span className="image-preview" />
													<div className="info">
														<div className="action-description">Drop file here or click to add file</div>
														<div className="file-description">.jpg, .png formats. 253.5 Kb max</div>
													</div>
												</div>
											)}
										</Dropzone>
										<button className="text-button blue">Remove icon</button>
									</div>


								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="buttons-wrap">
					<button className="decline-button">Cancel</button>
					<button disabled className="approve-button">Save Changes</button>
				</div>
			</div>
		);
	}

}

ManageContract.propTypes = {};

ManageContract.defaultProps = {};

export default ManageContract;
