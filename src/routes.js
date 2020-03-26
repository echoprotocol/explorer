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

import App, { loadData as loadAppInfo } from './containers/App';
import { loadData as loadBlockInfo } from './components/BlockInformation';
import { loadData as loadTransactionInfo } from './components/TransactionInfo';
import { loadData as loadObjectInfo } from './components/Objects';
import { loadData as loadAssetInfo } from './components/Asset';
import { loadData as loadDataNodeMap } from './components/NodeMap';
import { loadData as loadDataContract } from './components/Contract';

export default [
	{
		component: App,
		loadData: loadAppInfo,
		routes: [
			{
				path: INDEX_PATH,
				exact: true,
				component: RecentBlockSection,
			},
			{
				path: BLOCK_INFORMATION_PATH,
				exact: true,
				component: RecentBlockSection,
				loadData: loadBlockInfo,
			},
			{
				path: TRANSACTION_INFORMATION_PATH,
				exact: true,
				component: RecentBlockSection,
				loadData: loadTransactionInfo,
			},
			{
				path: OBJECTS_PATH,
				component: Objects,
				loadData: loadObjectInfo,
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
				loadData: loadAssetInfo,
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
				loadData: loadDataContract,
			},
			{
				path: NODE_MAP,
				exact: true,
				component: NodeMap,
				loadData: loadDataNodeMap,
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
