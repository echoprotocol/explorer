import { OPERATION_TYPES } from '../constants/OperationTypeConstants';

export const transformOperationDataByType = (type, data) => {
	switch (type) {
		case OPERATION_TYPES.TRANSFER:
			return {
				operationInfo: {
					type: 'Transfer',
					from: data.from,
					to: data.to,
					amount: data.amount,
					fee: data.fee,
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					directLink: 'https://explorer.echo.org/blocks/70/1?op=1',
				},
			};
		case OPERATION_TYPES.TRANSFER_TO_ADDRESS:
			return {
				operationInfo: {
					type: 'Transfer to address',
					from: {
						value: 'init1',
						link: '1.2.3',
					},
					to_address: 'https://explorer.echo.org/blocks/70/1?op=1',
					to_account: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
					directLink: 'https://explorer.echo.org/blocks/70/1?op=1',
				},
			};
		case OPERATION_TYPES.OVERRIDE_TRANSFER:
			return {
				operationInfo: {
					type: 'Override transfer',
					sender: {
						value: 'init1',
						link: '1.2.3',
					},
					from: {
						value: 'init1',
						link: '1.2.3',
					},
					to: {
						value: 'init1',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.ACCOUNT_CREATE:
			return {
				operationInfo: {
					type: 'Create account',
					registrar: data.registrar,
					account_name: {
						value: 'account',
						link: '1.2.3',
					},
					new_account_id: '1.2.3',
					authority: [{
						value: 'ECHOd9f8LmNjn32GUMXZwNZDsfBqa6qcBGvGk86kKTuvzkMjdW9saCrTtrPwGpuB',
						weight: '1',
					}, {
						value: 'vic.tor',
						weight: '1',
					}],
					echorand_key: 'anyStringValue',
					delegating_account: {
						value: 'account',
						link: '1.2.3',
					},
					delegate_share: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: data.fee,
				},
			};
		case OPERATION_TYPES.ACCOUNT_UPDATE:
			return {
				operationInfo: {
					type: 'Update account',
					delegate_share: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					account_updated: {
						value: 'account',
						link: '1.2.3',
					},
					echorand_key: 'anyStringValue',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.ACCOUNT_WHITELIST:
			return {
				operationInfo: {
					type: 'Account whitelist',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					listed_account: {
						value: 'account',
						link: '1.2.3',
					},
					new_status: 'statusString',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
				additionalInfo: {
					account_white_list: 'anyStringValue',
					account_black_list: 'anyStringValue',
				},
			};
		case OPERATION_TYPES.ACCOUNT_ADDRESS_CREATE:
			return {
				operationInfo: {
					type: 'Account address create',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					label: 'anyStringValue',
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
				},
			};
		case OPERATION_TYPES.ASSET_CREATE:
			return {
				operationInfo: {
					type: 'Create asset',
					issuer: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					precision: '8',
					max_suply: '12,000,000,000. 00000000',
					asset_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
					rate: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					is_bit_asset: true,
					settings: [{
						value: 'Whitelist',
						status: 'disabled',
					}, {
						value: 'Override authority',
						status: 'on',
					}, {
						value: 'Override authority',
						status: 'off',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.ASSET_UPDATE:
			return {
				operationInfo: {
					type: 'Update asset',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					max_suply: '12,000,000,000. 00000000',
					asset_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
					rate: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					settings: [{
						key: 'Whitelist',
						value: 'disabled',
					}, {
						key: 'Override authority',
						value: 'on',
					}, {
						key: 'Override authority',
						value: 'off',
					}],
					bit_asset_options: [{
						key: 'Feed lifetime',
						value: '12w, 23d, 34:34:56',
					}, {
						key: 'Minimum feeds',
						value: '3',
					}, {
						key: 'Short backing asset:',
						value: 'off',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.ASSET_UPDATE_BITASSET:
			return {
				operationInfo: {
					type: 'bitAsset update',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					max_suply: '12,000,000,000. 00000000',
					asset_description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. Aliquam porttitor mauris sit amet orci. Aenean dignissim pellentesque felis.',
					rate: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					bit_asset_options: [{
						key: 'Feed lifetime',
						value: '12w, 23d, 34:34:56',
					}, {
						key: 'Minimum feeds',
						value: '3',
					}, {
						key: 'Short backing asset:',
						value: 'off',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
			};
		case OPERATION_TYPES.ASSET_UPDATE_FEED_PRODUCERS:
			return {
				operationInfo: {
					type: 'Update asset feeders',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					asset_name: 'Asset name',
					new_feed_producers: [{
						value: 'account',
						link: '1.2.3',
					}, {
						value: 'pink-n-floyd01230',
						link: '1.2.4',
					}, {
						value: 'ViolletyLetty',
						link: '1.2.5',
					}],
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
				additionalInfo: {
					current_asset_feed_producers: [{
						value: 'account',
						link: '1.2.3',
					}, {
						value: 'pink-n-floyd01230',
						link: '1.2.4',
					}, {
						value: 'ViolletyLetty',
						link: '1.2.5',
					}],
				},
			};
		case OPERATION_TYPES.ASSET_ISSUE:
			return {
				operationInfo: {
					type: 'Issue asset',
					sender: {
						value: 'account',
						link: '1.2.3',
					},
					receiver: {
						value: 'account',
						link: '1.2.3',
					},
					amount: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					fee: {
						amount: 23,
						precision: 8,
						symbol: 'ECHO',
					},
					description: 'Description of operation goes here. Praesent dapibus, neque id cursus faucibus, tortor neque egestas auguae, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tin cidunt quis, accumsan porttitor, facilisis luctus, metus.',
				},
				additionalInfo: {
					current_asset_total_supply: '12,000,000,000. 00000000',
				},
			};
		case OPERATION_TYPES.ASSET_RESERSE
			.default:
			return {};
	}
};
