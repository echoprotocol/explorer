import {
	INDEX_PATH,
	BLOCK_INFORMATION_PATH,
	TRANSACTION_INFORMATION_PATH,
	OBJECTS_PATH,
	ACCOUNTS_PATH,
	ASSET_PATH,
	NOT_FOUND_PATH,
	CONTRACT_PATH_DETAIL,
	UPLOAD_ABI_PATH,
	MANAGE_CONTRACT_PATH,
	VERIFY_CONTRACT_PATH,
	NODE_MAP,
} from './constants/RouterConstants';

import RecentBlockSection from './containers/RecentBlockSection';
import Objects from './containers/Objects';
import Account from './containers/Account';
import Asset from './containers/Asset';
import UploadABI from './containers/UploadABI';
import ManageContract from './containers/ManageContract';
import VerifyContract from './containers/VerifyContract';
import Contract from './containers/Contract';
import NodeMap from './containers/NodeMap';
import NotFound from './containers/Error/NotFoundScreen';
import App from './containers/App';

export default [
	{
		...App,
		routes: [
			{
				...RecentBlockSection,
				key: 'INDEX_PATH',
				path: INDEX_PATH,
				exact: true,
			},
			{
				...RecentBlockSection,
				path: BLOCK_INFORMATION_PATH,
				exact: true,
			},
			{
				...RecentBlockSection,
				path: TRANSACTION_INFORMATION_PATH,
				exact: true,
			},
			{
				...Objects,
				path: OBJECTS_PATH,
				exact: true,
			},
			{
				...Account,
				path: ACCOUNTS_PATH,
				exact: true,
			},
			{
				...ASSET_PATH,
				path: Asset,
				exact: true,
			},
			{
				...UPLOAD_ABI_PATH,
				path: UploadABI,
				exact: true,
			},
			{
				...MANAGE_CONTRACT_PATH,
				path: ManageContract,
				exact: true,
			},
			{
				...VERIFY_CONTRACT_PATH,
				path: VerifyContract,
				exact: true,
			},
			{
				...CONTRACT_PATH_DETAIL,
				path: Contract,
				exact: true,
			},
			{
				...NODE_MAP,
				path: NodeMap,
				exact: true,
			},
			{
				...NOT_FOUND_PATH,
				path: NotFound,
				exact: true,
			},
			{
				...NotFound,
			},
		],
	},
];
