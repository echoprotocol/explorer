import React from 'react';

import InnerHeader from '../InnerHeader';
import CommitteeMembersTable from '../CommitteeMembersTable';

import membersData from './data';

import { COMMITTEE_TABLE_TYPE } from '../../constants/TableConstants';

class CommitteeMembers extends React.Component {

	render() {
		return (
			<div className="inner-container">
				<InnerHeader title="Committee Members" />
				<CommitteeMembersTable members={membersData.currentMembers} type={COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS} />
			</div>
		);
	}

}


export default CommitteeMembers;
