import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import PropTypes from 'prop-types';

import InnerHeader from '../InnerHeader';
import CommitteeMembersTable from '../CommitteeMembersTable';
import TabDropdown from '../TabDropdown/';

import membersData from './data';

import { COMMITTEE_TABLE_TYPE } from '../../constants/TableConstants';

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
						<CommitteeMembersTable members={membersData.currentMembers} type={COMMITTEE_TABLE_TYPE.CURRENT_MEMBERS} router={router} />
					</TabPanel>
					<TabPanel>
						<CommitteeMembersTable members={membersData.committeeCandidates} type={COMMITTEE_TABLE_TYPE.COMMITTEE_CANDIDATES} router={router} />
					</TabPanel>
					<TabPanel>
						<CommitteeMembersTable members={membersData.formerMembers} type={COMMITTEE_TABLE_TYPE.FORMER_MEMBERS} router={router} />
					</TabPanel>
				</Tabs>
			</div>
		);
	}

}

CommitteeMembers.propTypes = {
	router: PropTypes.object.isRequired,
};

export default CommitteeMembers;
