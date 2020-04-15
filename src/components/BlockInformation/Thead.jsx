import React, { memo } from 'react';
import InfoTooltip from '../InfoTooltip';

const DistributionThead = memo(() => (
	<thead>
		<tr>
			<td className="role">
				<div className="td-in">Role</div>
			</td>
			<td className="origin">
				<div className="td-in">
					Origin
					<InfoTooltip overlay="Account selected by consensus as a participant for the current block preparation" />
				</div>
			</td>
			<td className="delegate">
				<div className="td-in">
					Delegate
					<InfoTooltip
						overlay="An account that has been trusted to issue messages on behalf of the Origin. Only considered if there are no messages from the original participant"
					/>
				</div>
			</td>
			<td className="produced">
				<div className="td-in">
					Produced by the committee
					<InfoTooltip
						overlay="If Origin and Delegate did not send messages, the message will be sent by the committee"
					/>
				</div>
			</td>
		</tr>
	</thead>
));

export default DistributionThead;
