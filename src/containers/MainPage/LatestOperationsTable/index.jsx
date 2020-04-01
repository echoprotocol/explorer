import React, { memo } from 'react';

import TableLabel from '../../../components/TableLabel';

import Thead from './Thead';
import Row from './Row';

const LatestOperationsTable = memo(() => (
	<div className="main-page-table">
		<TableLabel label="Latest Operations" />
		<table>
			<Thead />
			<tbody>
				<tr className="air"><td /></tr>
				<Row
					operation="Block reward"
					from="dima1"
					to="dima1"
					amount={{ value: 0.00000670, coin: 'ECHO' }}
				/>
			</tbody>

		</table>
	</div>
));


export default LatestOperationsTable;
