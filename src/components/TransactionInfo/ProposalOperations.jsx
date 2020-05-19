import React from 'react';
import PropTypes from 'prop-types';
import OperationInfo from './OperationInfo';

const ProposalOperations = ({ operations }) => (
	operations.map((operation, id) => (
		<OperationInfo data={operation.operationInfo} key={`${operation.operationInfo.type}id`} proposalIdx={id + 1} />
	)));

ProposalOperations.propTypes = {
	operations: PropTypes.array.isRequired,
};

export default ProposalOperations;
