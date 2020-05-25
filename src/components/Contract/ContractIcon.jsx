import React from 'react';
import PropTypes from 'prop-types';
import defaultIcon from '../../public/images/icons/default-icn.svg';
import URLHelper from '../../helpers/URLHelper';


export const ContractIcon = React.memo(({ icon, ...props }) => (
	icon ?
		<img src={URLHelper.getUrlContractIcon(icon)} alt="icon" {...props} /> :
		<img src={defaultIcon} alt="icon" {...props} />
));


ContractIcon.propTypes = {
	icon: PropTypes.string,
};

ContractIcon.defaultProps = {
	icon: '',
};

