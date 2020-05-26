import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cn from 'classnames';
import queryString from 'query-string';

import InnerHeader from '../InnerHeader';
import CommitteeMembersTable from '../../containers/CommitteeTable';
import TabDropdown from '../TabDropdown/';

import GridActions from '../../actions/GridActions';
import CommitteeActions from '../../actions/CommitteeActions';

import {
	CANDIDATE_COMMITTEE_GRID,
	CURRENT_COMMITTEE_GRID,
	DEACTIVATED_COMMITTEE_GRID,
} from '../../constants/TableConstants';

import {
	SSR_CURRENT_COMMITTEE_PATH,
	SSR_CANDIDATE_COMMITTEE_PATH,
	SSR_FORMER_COMMITTEE_PATH,
	COMMITTEE_PATH,
} from '../../constants/RouterConstants';

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
		this.props.clearCommitteeInfo();
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

	renderTable() {
		const { router, loadingMoreCommittee } = this.props;
		const { asPath } = router;
		const { url } = queryString.parseUrl(asPath);
		const members = this.props.committee.toArray();

		if (url === SSR_CURRENT_COMMITTEE_PATH) {
			return (
				<CommitteeMembersTable
					members={members}
					gridName={CURRENT_COMMITTEE_GRID}
					router={router}
					onLoadCommittee={() => this.props.loadCommittees()}
					loading={loadingMoreCommittee}
				/>
			);
		}

		if (url === SSR_CANDIDATE_COMMITTEE_PATH) {
			return (
				<CommitteeMembersTable
					members={members}
					gridName={CANDIDATE_COMMITTEE_GRID}
					router={router}
					onLoadCommittee={() => this.props.loadCommittees()}
					loading={loadingMoreCommittee}
				/>
			);
		}

		if (url === SSR_FORMER_COMMITTEE_PATH) {
			return (
				<CommitteeMembersTable
					members={members}
					gridName={DEACTIVATED_COMMITTEE_GRID}
					router={router}
					onLoadCommittee={() => this.props.loadCommittees()}
					loading={loadingMoreCommittee}
				/>
			);
		}

		return undefined;
	}


	render() {
		const {
			currentTab, isDropdownOpened, tabs, resolution,
		} = this.state;
		const { router } = this.props;
		const { url } = queryString.parseUrl(router.asPath);
		return (
			<div className="inner-container indent-lg">
				<InnerHeader title="Committee Members" className="committee-members" />
				{resolution > 499 &&
					<div className="tabs members-tabs">
						<Link href={COMMITTEE_PATH} as={SSR_CURRENT_COMMITTEE_PATH} scroll={false}>
							<a className={cn('tab', { active: url === SSR_CURRENT_COMMITTEE_PATH })}>Current Members</a>
						</Link>
						<Link href={COMMITTEE_PATH} as={SSR_CANDIDATE_COMMITTEE_PATH} scroll={false}>
							<a className={cn('tab', { active: url === SSR_CANDIDATE_COMMITTEE_PATH })} >Committee candidates</a>
						</Link>
						<Link href={COMMITTEE_PATH} as={SSR_FORMER_COMMITTEE_PATH} scroll={false}>
							<a className={cn('tab', { active: url === SSR_FORMER_COMMITTEE_PATH })}>Former members</a>
						</Link>
					</div>
				}
				{resolution <= 499 &&
				<TabDropdown
					value={currentTab}
					toggleDropdown={this.toggleDropdown}
					opened={isDropdownOpened}
					trigerRef={this.trigerRef}
					dropDownRef={this.dropdownRef}
				>
					<Link href={COMMITTEE_PATH} as={SSR_CURRENT_COMMITTEE_PATH} scroll={false}>
						<a
							role="presentation"
							className={cn('dropdown-tab__item', { active: url === SSR_CURRENT_COMMITTEE_PATH })}
							onClick={() => this.setActiveTab(0)}
						>{tabs[0]}
						</a>
					</Link>
					<Link href={COMMITTEE_PATH} as={SSR_CANDIDATE_COMMITTEE_PATH} scroll={false}>
						<a
							role="presentation"
							className={cn('dropdown-tab__item', { active: url === SSR_CANDIDATE_COMMITTEE_PATH })}
							onClick={() => this.setActiveTab(1)}
						>{tabs[1]}
						</a>
					</Link>
					<Link href={COMMITTEE_PATH} as={SSR_FORMER_COMMITTEE_PATH} scroll={false}>
						<a
							role="presentation"
							className={cn('dropdown-tab__item', { active: url === SSR_FORMER_COMMITTEE_PATH })}
							onClick={() => this.setActiveTab(2)}
						>{tabs[2]}
						</a>
					</Link>
				</TabDropdown>}
				{this.renderTable()}
			</div>
		);
	}

}

CommitteeMembers.propTypes = {
	router: PropTypes.object.isRequired,
	clearCommitteeInfo: PropTypes.func.isRequired,
	loadCommittees: PropTypes.func.isRequired,
	committee: PropTypes.object.isRequired,
	loadingMoreCommittee: PropTypes.bool.isRequired,
};

CommitteeMembers.getInitialProps = async ({ query: { ...filters }, store }) => {
	await store.dispatch(GridActions.initData(CURRENT_COMMITTEE_GRID, filters));
	await store.dispatch(GridActions.initData(CANDIDATE_COMMITTEE_GRID, filters));
	await store.dispatch(GridActions.initData(DEACTIVATED_COMMITTEE_GRID, filters));
	await store.dispatch(CommitteeActions.loadCommittees(ECHODB_COMMITTEE_STATUS.ACTIVE));
	await store.dispatch(CommitteeActions.loadCommittees(ECHODB_COMMITTEE_STATUS.CANDIDATE));
	await store.dispatch(CommitteeActions.loadCommittees(ECHODB_COMMITTEE_STATUS.DEACTIVATED));
	return {};
};

export default CommitteeMembers;
