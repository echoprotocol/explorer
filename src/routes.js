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

import App, { loadData as loadDataApp } from './containers/App';
import { loadData as loadDataBlockInfo } from './components/BlockInformation';
import { loadData as loadDataTransactionInfo } from './components/TransactionInfo';
import { loadData as loadDataObjectInfo } from './components/Objects';

export default [
	{
		component: App,
		routes: [
			{
				path: INDEX_PATH,
				exact: true,
				component: RecentBlockSection,
				loadData: loadDataApp,
			},
			{
				path: BLOCK_INFORMATION_PATH,
				exact: true,
				component: RecentBlockSection,
				loadData: loadDataBlockInfo,
			},
			{
				path: TRANSACTION_INFORMATION_PATH,
				exact: true,
				component: RecentBlockSection,
				loadData: loadDataTransactionInfo,
			},
			{
				path: OBJECTS_PATH,
				component: Objects,
				loadData: loadDataObjectInfo,
			},
			{
				path: ACCOUNTS_PATH,
				exact: true,
				component: Account,
			},
			{
				path: ASSET_PATH,
				exact: true,
				component: Asset,
			},
			{
				path: UPLOAD_ABI_PATH,
				exact: true,
				component: UploadABI,
			},
			{
				path: MANAGE_CONTRACT_PATH,
				exact: true,
				component: ManageContract,
			},
			{
				path: VERIFY_CONTRACT_PATH,
				exact: true,
				component: VerifyContract,
			},
			{
				path: CONTRACT_PATH_DETAIL,
				exact: true,
				component: Contract,
			},
			{
				path: NODE_MAP,
				exact: true,
				component: NodeMap,
			},
			{
				path: NOT_FOUND_PATH,
				exact: true,
				component: NotFound,
			},
			{
				component: NotFound,
			},
		],
	},
];
