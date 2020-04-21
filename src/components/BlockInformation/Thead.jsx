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
					<span>Origin</span>
					<InfoTooltip overlay="Account selected by consensus as a participant for the current block preparation" iconFilled={false} />
				</div>
			</td>
			<td className="delegate">
				<div className="td-in">
					<span>Delegate</span>
					<InfoTooltip
						iconFilled={false}
						overlay="An account that has been trusted to issue messages on behalf of the Origin. Only considered if there are no messages from the original participant"
					/>
				</div>
			</td>
			<td className="produced">
				<div className="td-in">
					<span>Produced by the committee</span>
					<InfoTooltip
						iconFilled={false}
						overlay="If Origin and Delegate did not send messages, the message will be sent by the committee"
					/>
				</div>
			</td>
		</tr>
	</thead>
));

export default DistributionThead;
