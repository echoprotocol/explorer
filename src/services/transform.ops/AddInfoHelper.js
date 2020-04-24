import echo, { OPERATIONS_IDS } from 'echojs-lib';
import BN from 'bignumber.js';
import { payments } from 'bitcoinjs-lib';
import Buffer from 'buffer-ponyfill';
import moment from 'moment';

import { ASSET_ISSUER_PERMISSION_FLAGS } from '../../constants/OpsFormatConstants';
import { ECHO_ASSET } from '../../constants/GlobalConstants';

export async function countRate(asset, { base, quote }) {
	const amount = (new BN(base.amount).div(`1e${ECHO_ASSET.PRECISION}`))
		.div(new BN(quote.amount).div(`1e${asset.precision}`)).toString();

	return {
		amount,
		asset_id: asset.id,
		symbol: asset.symbol,
		precision: asset.precision,
	};
}

async function getAccountWhiteListInfo(accountId) {
	const [account] = await echo.api.getAccounts([accountId]);
	return {
		whitelisting_accounts: account.whitelisted_accounts.map((id) => ({ link: id, value: id })),
		blacklisting_accounts: account.blacklisted_accounts.map((id) => ({ link: id, value: id })),
	};
}

export function getAssetFlags({ flags, issuer_permissions: permissionFlags }) {
	let [isWhiteList, isOvveride, isTransfer, isCommette] = ['disable', 'disable', 'disable', 'disable'];
	if (!permissionFlags) {
		return {
			isWhiteList, isOvveride, isTransfer, isCommette,
		};
	}
	/* eslint-disable */
	isWhiteList = (ASSET_ISSUER_PERMISSION_FLAGS.WHITE_LIST & flags) ? 'on' : 'off';
	isOvveride = (ASSET_ISSUER_PERMISSION_FLAGS.OVVERIDE_AUTHORITY & flags) ? 'on' : 'off';
	isTransfer = (ASSET_ISSUER_PERMISSION_FLAGS.TRANSFER_RESTRICTED & flags) ? 'on' : 'off';
	isCommette = (ASSET_ISSUER_PERMISSION_FLAGS.COMMITTEE_FED_ASSET & flags) ? 'on' : 'off';
	/* eslint-enable */
	return {
		isWhiteList, isOvveride, isTransfer, isCommette,
	};
}

async function getAssetCreateInfo(assetId) {
	const [asset] = await echo.api.getAssets([assetId]);
	return getAssetFlags(asset.options);
}

async function getAssetUpdateFeedProducersInfo(assetId) {
	const asset = await echo.api.getObject(assetId);
	const producersIds = asset.bitasset.feeds.map(([producerId]) => producerId);
	const producers = await echo.api.getAccounts(producersIds);
	const assetFeedProducers = producers.map(({ name, id }) => ({ value: name, link: id }));
	return { assetFeedProducers };
}

function getBtcAddressByPublicKey(address) {
	let btcAddress = '';
	if (!address) { return btcAddress; }
	try {
		btcAddress = payments.p2pkh({ pubkey: Buffer.from(address, 'hex') }).address;
	} catch (err) {
		console.log('Error to transform btc_public_key', err);
	}

	return btcAddress;
}

async function isCommiteeMemberById(accountId) {
	const committee = await echo.api.getCommitteeMemberByAccount(accountId);
	return committee ? 'Member of the committee' : 'Not a member of the committee';
}

async function getCommiteeMemberCreateInfo({ btc_public_key: pubKey, committee_member_account: accountId }) {
	const btcAddress = getBtcAddressByPublicKey(pubKey);
	const committeeStatus = await isCommiteeMemberById(accountId.link);
	return {
		btcAddress,
		committeeStatus,
	};
}

async function getCommiteeMemberUpdateInfo({ new_btc_public_key: pubKey, committee_member_account: accountId }) {
	const btcAddress = getBtcAddressByPublicKey(pubKey);
	const committeeStatus = await isCommiteeMemberById(accountId.link);
	return {
		btcAddress,
		committeeStatus,
	};
}

async function getCommiteeMemberActivateInfo({ committee_to_activate: { link: accountId } }) {
	const committeeStatus = await isCommiteeMemberById(accountId);
	return {
		committeeStatus,
	};
}

async function getCommiteeMemberDeActivateInfo({ committee_to_deactivate: { link: accountId } }) {
	const committeeStatus = await isCommiteeMemberById(accountId);
	return {
		committeeStatus,
	};
}

async function getCommitteFrozenBalanceDepositInfo({ committee_member_account: { link: accountId } }) {
	const committeeStatus = await isCommiteeMemberById(accountId);
	return {
		committeeStatus,
	};
}

async function getVestingBalanceInfo({ owner: { link: accountId } }) {
	const [{ balance: { amount: balanceToWithdraw }, policy }] = await echo.api.getVestingBalances(accountId);
	const {
		begin_timestamp: beginTimestamp, begin_balance: beginBalance, vesting_duration_seconds: duration,
		vesting_cliff_seconds: cliff,
	} = policy[1];
	const diffNowAndBeginTimestamp = moment().diff(beginTimestamp, 'seconds');
	const isAllowedBalance = diffNowAndBeginTimestamp > 0;
	let balanceToClaim = new BN(0);

	let percentVestedBalance = new BN(diffNowAndBeginTimestamp).dividedBy(duration);
	if (percentVestedBalance.gt(1)) {
		percentVestedBalance = new BN(1);
	}
	const vestedBalance = percentVestedBalance.multipliedBy(beginBalance);
	const beginTimestampAndCliff = moment(beginTimestamp).add(cliff, 'second');
	const isAllowToClaim = moment().diff(beginTimestampAndCliff, 'seconds') > 0;
	if (isAllowToClaim) {
		balanceToClaim = vestedBalance;
	}

	return {
		isAllowedBalance,
		vestedBalance: vestedBalance.toString(),
		balanceToClaim: balanceToClaim.toString(),
		balanceToWithdraw: balanceToWithdraw.toString(),
	};
}

async function getContractCreateInfo(data) {
	const objectInfo = data.objectInfo.toJS();
	const contractId = data['new contract id'];
	let token = null;

	if (objectInfo.type === 'erc20') {

		token = {
			id: contractId,
			...objectInfo.token,
		};
	}


	return {
		token,
	};
}

async function getAdditionalInfoByOpId(opId, data) {
	try {
		switch (opId) {
			case OPERATIONS_IDS.ACCOUNT_WHITELIST:
				return await getAccountWhiteListInfo(data);
			case OPERATIONS_IDS.ASSET_CREATE:
				return await getAssetCreateInfo(data);
			case OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS:
				return await getAssetUpdateFeedProducersInfo(data);
			case OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE:
				return await getCommiteeMemberCreateInfo(data);
			case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE:
				return await getCommiteeMemberUpdateInfo(data);
			case OPERATIONS_IDS.COMMITTEE_MEMBER_ACTIVATE:
				return await getCommiteeMemberActivateInfo(data);
			case OPERATIONS_IDS.COMMITTEE_MEMBER_DEACTIVATE:
				return await getCommiteeMemberDeActivateInfo(data);
			case OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_DEPOSIT:
				return await getCommitteFrozenBalanceDepositInfo(data);
			case OPERATIONS_IDS.VESTING_BALANCE_CREATE:
				return await getVestingBalanceInfo(data);
			case OPERATIONS_IDS.VESTING_BALANCE_WITHDRAW:
				return await getVestingBalanceInfo(data);
			case OPERATIONS_IDS.CONTRACT_CREATE:
				return await getContractCreateInfo(data);
			default:
				return null;
		}
	} catch (err) {
		console.log('Error to get additional data ops: ', err);
		return null;
	}
}

export default getAdditionalInfoByOpId;
