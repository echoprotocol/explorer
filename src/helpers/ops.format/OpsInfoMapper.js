import { OPERATIONS_IDS } from 'echojs-lib';

import {
	ACCOUNT_BLACK_WHITE, ECHO_COMMITTEE_ACCOUNT,
	OPS_DESCRIPTIONS,
	OPS_TYPES,
} from '../../constants/OpsFormatConstants';

import getAdditionalInfoByOpId, { getAssetFlags } from './AddInfoHelper';

// TODO description all
export const transformOperationDataByType = async (opNumber, data) => {
	const type = OPS_TYPES[opNumber];
	const description = OPS_DESCRIPTIONS[opNumber];
	switch (opNumber) {
		case OPERATIONS_IDS.TRANSFER:
			return {
				operationInfo: {
					type,
					from: data.from,
					to: data.to,
					amount: data.amount,
					fee: data.fee,
					...description,
				},
			};
		case OPERATIONS_IDS.TRANSFER_TO_ADDRESS:
			return {
				operationInfo: {
					type,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to_address: data.to_address,
					to_account: data.to_account,
					...description,
				},
			};
		case OPERATIONS_IDS.OVERRIDE_TRANSFER:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					from: data.from,
					amount: data.amount,
					fee: data.fee,
					to: data.to,
					...description,
				},
			};
		case OPERATIONS_IDS.ACCOUNT_CREATE: {
			const { active } = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					registrar: data.registrar,
					account_name: {
						value: data.mainInfo.subject.name,
						link: data.mainInfo.subject.id,
					},
					new_account_id: data.mainInfo.subject.id,
					authority: [...active.key_auths, ...active.account_auths].map(([value, weight]) => ({ value, weight })),
					weight_threshold: active.weight_threshold,
					echorand_key: data.echorand_key,
					delegating_account: data.delegating_account,
					delegate_share: data.delegate_share,
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ACCOUNT_UPDATE: {
			const { active } = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					delegate_share: data.delegate_share,
					delegating_account: data.delegating_account,
					authority: [...active.key_auths, ...active.account_auths].map(([value, weight]) => ({ value, weight })),
					echorand_key: data.objectInfo.get('echorandKey'),
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ACCOUNT_WHITELIST: {
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.authorizing_account.link);
			return {
				operationInfo: {
					type,
					fee: data.fee,
					sender: data.authorizing_account,
					listed_account: data.account_to_list,
					new_status: ACCOUNT_BLACK_WHITE[data.new_listing],
					additionalInfo,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ACCOUNT_ADDRESS_CREATE:
			return {
				operationInfo: {
					type,
					sender: data.owner,
					address: data.address,
					label: data.label,
					fee: data.fee,
					...description,
				},
			};
		case OPERATIONS_IDS.ASSET_CREATE: {
			const settings = await getAssetFlags(data.objectInfo.toJS());
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.mainInfo.result);
			const asset = { value: data.mainInfo.subject.name, link: data.mainInfo.subject.id };
			return {
				operationInfo: {
					type,
					issuer: data.issuer,
					asset,
					precision: data.precision.precision,
					max_supply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					fee: data.fee,
					rate: data.objectInfo.get('rate'),
					is_bit_asset: data.objectInfo.get('bitAssetOps') ? 'Yes' : 'No',
					settings: [{
						key: 'Whitelist',
						value: settings.isWhiteList,
					}, {
						key: 'Override authority',
						value: settings.isOvveride,
					}, {
						key: 'Transfer restricted',
						value: settings.isTransfer,
					}, {
						key: 'Commitee fed asset authority',
						value: settings.isCommette,
					}],
					additionalInfo: {
						settings: [{
							key: 'Whitelist',
							value: additionalInfo.isWhiteList,
						}, {
							key: 'Override authority',
							value: additionalInfo.isOvveride,
						}, {
							key: 'Transfer restricted',
							value: additionalInfo.isTransfer,
						}, {
							key: 'Commitee fed asset authority',
							value: additionalInfo.isCommette,
						}],
					},
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE: {
			// TODO check issuer and new_issuer
			const settings = await getAssetFlags(data.objectInfo.toJS());
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset: data.asset_to_update,
					max_supply: data.objectInfo.get('maxSupply'),
					asset_description: data.objectInfo.get('description'),
					rate: data.objectInfo.get('rate'),
					new_issuer: data.new_issuer,
					settings: [{
						key: 'Whitelist',
						value: settings.isWhiteList,
					}, {
						key: 'Override authority',
						value: settings.isOvveride,
					}, {
						key: 'Transfer restricted',
						value: settings.isTransfer,
					}, {
						key: 'Commitee fed asset authority',
						value: settings.isCommette,
					}],
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE_BITASSET: {
			const { bitAssetOps } = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset: data.asset_to_update,
					max_supply: data.objectInfo.get('maxSupply'),
					rate: data.objectInfo.get('rate'),
					bit_asset_options: [{
						key: 'Feed lifetime',
						value: bitAssetOps.feed_lifetime_sec,
					}, {
						key: 'Minimum feeds',
						value: bitAssetOps.minimum_feeds,
					}, {
						key: 'Short backing asset:',
						value: bitAssetOps.short_backing_asset,
					}],
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.ASSET_UPDATE_FEED_PRODUCERS: {
			const additionalInfo = await getAdditionalInfoByOpId(opNumber, data.asset_to_update.link);
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					asset: data.asset_to_update,
					asset_description: data.objectInfo.get('description'),
					new_feed_producers: data.new_feed_producers,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_asset_feed_producers: additionalInfo.assetFeedProducers,
					},
				},
			};
		}
		case OPERATIONS_IDS.ASSET_ISSUE:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					amount: data.asset_to_issue,
					receiver: data.issue_to_account,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_asset_total_supply: data.objectInfo.get('totalSupply'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_RESERVE:
			return {
				operationInfo: {
					type,
					sender: data.payer,
					amount: data.amount_to_reserve,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_asset_total_supply: data.objectInfo.get('totalSupply'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_FUND_FEE_POOL:
			return {
				operationInfo: {
					type,
					sender: data.from_account,
					amount: data.mainInfo.value,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_asset_fee_pool: data.objectInfo.get('totalSupply'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_PUBLISH_FEED:
			return {
				operationInfo: {
					type,
					sender: data.publisher,
					asset: data.asset_id,
					feeded_asset_price: data.asset_id,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_asset_price: data.objectInfo.get('price'),
					},
				},
			};
		case OPERATIONS_IDS.ASSET_CLAIM_FEES:
			return {
				operationInfo: {
					type,
					sender: data.issuer,
					amount: data.amount_to_claim,
					fee: data.fee,
					...description,
					additionalInfo: {
						feeded_asset_fee_pool: data.objectInfo.get('totalSupply'),
						current_asset_unclaimed_fee: data.objectInfo.get('accumulated_fees'),
					},
				},
			};
		// case OPERATIONS_IDS.PROPOSAL_CREATE: {
		//
		// 	console.log('datadsads.PROPOSAL_CREATEddasd ', data.proposals);
		// 	return {
		// 		operationInfo: {
		// 			type,
		// 			sender: data.fee_paying_account,
		// 			expiration_time: data.expiration_time,
		// 			preview_period: data.review_period_seconds.amount,
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				// count_approvals: { // ADD after succce proposal
		// 				// 	value: 2,
		// 				// 	total: 4,
		// 				// },
		// 				proposal_status: data.objectInfo ? 'resolve' : 'rejected',
		// 				result_transaction: 'https://explorer.echo.org/blocks/70/1?op=1',
		// 			},
		// 		},
		// 		proposalOperations: data.proposals,
		// 	};
		// }
		// case OPERATIONS_IDS.PROPOSAL_UPDATE: {
		// 	return {
		// 		operationInfo: {
		// 			type,
		// 			sender: data.fee_paying_account,
		// 			proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
		// 			approvals_to_add: [{
		// 				value: 'ECHOd9f8LmNjn32GUMXZwNZDsfBqa6qcBGvGk86kKTuvzkMjdW9saCrTtrPwGpuB',
		// 				weight: '1',
		// 			}],
		// 			approvals_to_remove: [{
		// 				value: 'vic.tor',
		// 				weight: '1',
		// 			}],
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				count_signatures: '2',
		// 				proposal_status: 'approved',
		// 			},
		// 		},
		// 		proposalOperations: data.proposed_ops,
		// 	};
		// }
		// case OPERATIONS_IDS.PROPOSAL_DELETE: {
		// 	return {
		// 		operationInfo: {
		// 			type,
		// 			sender: data.fee_paying_account,
		// 			proposal_id: 'https://explorer.echo.org/blocks/70/1?op=1',
		// 			fee: data.fee,
		// 			...description,
		// 			additionalInfo: {
		// 				count_signatures: '2',
		// 				proposal_status: 'approved',
		// 			},
		// 		},
		// 		// proposalOperations: data.proposed_ops,
		// 	};
		// }
		case OPERATIONS_IDS.COMMITTEE_MEMBER_CREATE: {
			const { btcAddress, committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					url: data.url,
					eth_address: data.eth_address,
					btc_address: btcAddress,
					deposit_amount: data.deposit,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE: {
			const { btcAddress, committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					new_url: data.new_url,
					new_eth_address: data.new_eth_address,
					new_btc_address: btcAddress,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_UPDATE_GLOBAL_PARAMETERS: {
			return {
				operationInfo: {
					type,
					sender: {
						value: ECHO_COMMITTEE_ACCOUNT.NAME,
						link: ECHO_COMMITTEE_ACCOUNT.ID,
					},
					// changed_parameters: ['param1', 'param2', 'param3'],
					fee: data.fee,
					...description,
					additionalInfo: {
						current_global_parametres: 'https://explorer.echo.org/blocks/70/1?op=1',
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_ACTIVATE: {
			// TODO check
			// const { committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					account_name: data.committee_to_activate,
					fee: data.fee,
					...description,
					additionalInfo: {
						// committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_MEMBER_DEACTIVATE: {
			// TODO check
			// const { committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					account_name: data.committee_to_deactivate,
					fee: data.fee,
					...description,
					additionalInfo: {
						// committee_status: committeeStatus,
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_DEPOSIT: {
			const { committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
						current_account_frozen_balance: data.objectInfo.get('frozenBalance'),
					},
				},
			};
		}
		case OPERATIONS_IDS.COMMITTEE_FROZEN_BALANCE_WITHDRAW: {
			// check
			const { committeeStatus } = await getAdditionalInfoByOpId(opNumber, data);
			return {
				operationInfo: {
					type,
					sender: data.committee_member_account,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						committee_status: committeeStatus,
						current_account_frozen_balance: data.objectInfo.get('frozenBalance'),
					},
				},
			};
		}
		case OPERATIONS_IDS.VESTING_BALANCE_CREATE: {
			const {
				isAllowedBalance, vestedBalance, balanceToClaim, balanceToWithdraw,
			} = await getAdditionalInfoByOpId(opNumber, data);

			return {
				operationInfo: {
					type,
					sender: data.creator,
					owner: data.owner,
					amount: data.amount,
					policy: [{
						name: 'Object 1',
						...data.policy[1],
					}],
					fee: data.fee,
					...description,
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: isAllowedBalance ? 'Available' : 'Not available',
						}, {
							key: 'Vested balance',
							value: `${vestedBalance} ECHO`,
						}, {
							key: 'Available to claim',
							value: `${balanceToClaim} ECHO`,
						}, {
							key: 'Allow to withdraw',
							value: `${balanceToWithdraw} ECHO`,
						}],
					},
				},
			};
		}
		case OPERATIONS_IDS.VESTING_BALANCE_WITHDRAW: {
			const {
				isAllowedBalance, vestedBalance, balanceToClaim, balanceToWithdraw,
			} = await getAdditionalInfoByOpId(opNumber, data);

			return {
				operationInfo: {
					type,
					sender: data.owner,
					amount: data.amount,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: isAllowedBalance ? 'Available' : 'Not available',
						}, {
							key: 'Vested balance',
							value: `${vestedBalance} ECHO`,
						}, {
							key: 'Available to claim',
							value: `${balanceToClaim} ECHO`,
						}, {
							key: 'Allow to withdraw',
							value: `${balanceToWithdraw} ECHO`,
						}],
					},
				},
			};
		}
		case OPERATIONS_IDS.BALANCE_CLAIM: {
			//  TODO
			// balance_object_id check on null
			return {
				operationInfo: {
					type,
					sender: data.deposit_to_account,
					balance_object_id: data.balance_to_claim,
					amount: data.amount,
					balance_owner_key: data.balance_owner_key,
					fee: data.fee,
					...description,
					additionalInfo: {
						current_vesting_balance_state: [{
							key: 'Status',
							value: 'statusString',
						}, {
							key: 'Vested balance',
							value: '1000.000000234 ECHO',
						}, {
							key: 'Available to claim',
							value: 'string',
						}, {
							key: 'Allow to withdraw',
							value: 'string',
						}],
					},
				},
			};
		}
		case OPERATIONS_IDS.BALANCE_FREEZE: {
			const duration = data.duration.amount > 1 ? `${data.duration.amount} days` : `${data.duration.amount} day`;
			return {
				operationInfo: {
					type,
					sender: data.account,
					duration,
					amount: data.amount,
					fee: data.fee,
					...description,
				},
			};
		}
		case OPERATIONS_IDS.BALANCE_UNFREEZE: {
			return {
				operationInfo: {
					type: 'Unfreeze balance (virtual)',
					receiver: data.account,
					amount: data.amount,
				},
			};
		}

		case OPERATIONS_IDS.CONTRACT_CREATE: {
			const objectInfo = data.objectInfo.toJS();
			return {
				operationInfo: {
					type,
					sender: data.registrar,
					contract_type: data.objectInfo.get('type'),
					deployed_contract_bytecode: data.bytecode,
					deploy_arguments: ['stringElement1', 'stringElement2', 'stringElement3', 'stringElement4', 'stringElement5'],
					amount: data.value,
					eth_accuracy_is_enabled: data.objectInfo.get('ethAccuracy'),
					supported_asset: data.objectInfo.get('supportedAsset') || 'None',
					fee: data.fee,
					additionalInfo: {
						...(objectInfo.token && {
							erc20_token_info: [{
								key: 'Token symbol (name)',
								value: objectInfo.token.symbol,
							}, {
								key: 'Decimals',
								value: objectInfo.token.decimals,
							}, {
								key: 'Total supply',
								value: objectInfo.token.total_supply,
							}],
							erc20_token_transfers: [{
								amount: {
									amount: 230,
									precision: 8,
									symbol: 'ECHO',
								},
								from: {
									value: 'account',
									link: '1.2.4',
								},
								to: {
									value: 'account',
									link: '1.2.5',
								},
							}, {
								amount: {
									amount: 16,
									precision: 8,
									symbol: 'ECHO',
								},
								from: {
									value: 'pink-n-floyd01230',
									link: '1.2.3',
								},
								to: {
									value: 'nathen1234',
									link: '1.2.3',
								},
							}],
						}),
						asset_transfers: [{
							amount: {
								amount: 230,
								precision: 8,
								symbol: 'ECHO',
							},
							from: {
								value: '',
								link: '1.2.3',
							},
							to: {
								value: 'account',
								link: '1.2.3',
							},
						}],
					},
				},
				logs: [{
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}, {
					address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
					name: {
						name: 'String',
						params: ['param1', 'param2', 'param3'],
					},
					topics: ['ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3eh', 'ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ek'],
					data: '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000009f8f72aa9304c8b593d555f12ef6589cc3a579a20000000000000000000000000000000000000000000000001408de424e0172550000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000000000000000000000000000000000005e745a6c',
				}],
				internalOperations: [{
					operationInfo: {
						type: 'Contract call',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
						bytecode: '60806040523480156200001157600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040805190810160405280600581526020017f4649584544000000000000000000000000000000000000000000000000000000815250600290805190602001906200009f92919062000221565b506040805190810160405280601a81526020017f4578616d706c6520466978656420537570706c7920',
					},
				}, {
					operationInfo: {
						type: 'Contract create',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc3',
						asset_amount_sent: {
							amount: 230,
							precision: 8,
							symbol: 'ECHO',
						},
					},
				}, {
					operationInfo: {
						type: 'Contract delete',
						contract_id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc4',
					},
				}],
			};
		}
		default:
			return {};
	}
};
