import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

import InnerHeader from '../InnerHeader';
import CommitteeMembersTable from '../CommitteeMembersTable';
import TabDropdown from '../TabDropdown/';

import GridActions from '../../actions/GridActions';
import AccountActions from '../../actions/AccountActions';
import membersData from './data';

import {
	CANDIDATE_COMMITTEE_GRID,
	CURRENT_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';

import { ECHODB_COMMITTEE_STATUS } from '../../constants/CommitteeConstants';

class CommitteeMembers extends React.Component {

	constructor(props) {
		super(props);

		this.trigerRef = React.createRef();
		this.dropdownRef = React.createRef();
		this.state = {
			isDropdownOpened: false,
			resolution: 1920,
			currentTab: 'Current Members',
			tabs: ['Current Members', 'Committee candidates', 'Former members'],
		};
		this.toggleDropdown = this.toggleDropdown.bind(this);
		this.updateResolution = this.updateResolution.bind(this);
	}

	componentDidMount() {
		this.updateResolution();
		window.addEventListener('resize', this.updateResolution);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateResolution);
	}

	setActiveTab(index) {
		const { tabs } = this.state;
		this.trigerRef.current.focus();
		this.setState({
			currentTab: tabs[index],
			isDropdownOpened: !this.state.isDropdownOpened,
		});
	}

	toggleDropdown(dropdownState) {
		this.setState({
			isDropdownOpened: dropdownState,
		});
	}

	updateResolution() {
		this.setState({ resolution: window.innerWidth });
	}


	render() {
		const {
			currentTab, isDropdownOpened, tabs, resolution,
		} = this.state;
		const { router } = this.props;
		return (
			<div className="inner-container indent-lg">
				<InnerHeader title="Committee Members" className="committee-members" />
				<Tabs>
					<TabList className="tabs members-tabs">
						{resolution > 499 &&
						<React.Fragment>
							<Tab>
								<button className="tab">Current Members</button>
							</Tab>
							<Tab>
								<button className="tab">Committee candidates</button>
							</Tab>
							<Tab>
								<button className="tab">Former members</button>
							</Tab>
						</React.Fragment>}
						{resolution <= 499 &&
							<TabDropdown
								value={currentTab}
								toggleDropdown={this.toggleDropdown}
								opened={isDropdownOpened}
								trigerRef={this.trigerRef}
								dropDownRef={this.dropdownRef}
							>
								<Tab>
									<button className="dropdown-tab__item" onClick={() => this.setActiveTab(0)}>{tabs[0]}</button>
								</Tab>
								<Tab>
									<button className="dropdown-tab__item" onClick={() => this.setActiveTab(1)}>{tabs[1]}</button>
								</Tab>
								<Tab>
									<button className="dropdown-tab__item" onClick={() => this.setActiveTab(2)}>{tabs[2]}</button>
								</Tab>
							</TabDropdown>}
					</TabList>
					<TabPanel>
						<CommitteeMembersTable members={this.props.currentCommittee.toArray()} type={CURRENT_COMMITTEE_GRID} router={router} />
					</TabPanel>
					<TabPanel>
						<CommitteeMembersTable members={this.props.candidateCommittee.toArray()} type={CANDIDATE_COMMITTEE_GRID} router={router} />
					</TabPanel>
					<TabPanel>
						<CommitteeMembersTable members={this.props.deactivatedCommittee.toArray()} type={DEACTIVATED_COMMITTEE_GRID} router={router} />
					</TabPanel>
				</Tabs>
			</div>
		);
	}

}

CommitteeMembers.propTypes = {
	router: PropTypes.object.isRequired,
	currentCommittee: PropTypes.object.isRequired,
	candidateCommittee: PropTypes.object.isRequired,
	deactivatedCommittee: PropTypes.object.isRequired,
};

CommitteeMembers.getInitialProps = async ({ query: { ...filters }, store }) => {
	await store.dispatch(GridActions.initData(CURRENT_COMMITTEE_GRID, filters));
	// await store.dispatch(GridActions.initData(CANDIDATE_COMMITTEE_GRID, filters));
	// await store.dispatch(GridActions.initData(DEACTIVATED_COMMITTEE_GRID, filters));
	await store.dispatch(AccountActions.loadCommittees(ECHODB_COMMITTEE_STATUS.ACTIVE));
	// await store.dispatch(AccountActions.loadCommittees(ECHODB_COMMITTEE_STATUS.CANDIDATE));
	// await store.dispatch(AccountActions.loadCommittees(ECHODB_COMMITTEE_STATUS.DEACTIVATED));
	return {};
};

export default CommitteeMembers;
