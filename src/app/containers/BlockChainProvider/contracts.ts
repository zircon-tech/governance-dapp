import { IContractNetworks } from './types';
import GovernorAdminABI from './abi/GovernorAdmin.json';
import StakingABI from './abi/Staking.json';
import SovTokenABI from './abi/SOV.json';
import VestingRegistryABI from './abi/VestingRegistry.json';
import feeSharingProxyAbi from './abi/FeeSharingProxy.json';
import tokenAbi from './abi/abiTestToken.json';
import abiTestWBRTCToken from './abi/abiTestWBRTCToken.json';
import priceFeedsAbi from './abi/priceFeedAbi.json';
import SwapNetworkABI from './abi/SovrynSwapNetwork.json';
import multicallABI from './abi/multicall.json';

export const contracts: IContractNetworks = {
  testnet: {
    sovToken: {
      address: '0xaa7038D80521351F243168FefE0352194e3f83C3',
      abi: SovTokenABI as any,
    },
    staking: {
      address: '0xc1fc98FEFA2130fC1CE352ec85f7aa61021eFE97',
      abi: StakingABI as any,
    },
    governorAdmin: {
      address: '0xC7c0f925BC000b7D4d195518CF137ceB895Cf474',
      abi: GovernorAdminABI as any,
    },
    governorOwner: {
      address: '0x108203F4B06CD28891b370438C0aF981A9785597',
      abi: GovernorAdminABI as any,
    },
    vestingRegistry: {
      address: '0xFd8ea2e5e8591fA791d44731499cDF2e81CD6a41',
      abi: VestingRegistryABI as any,
    },
    vestingRegistry2: {
      address: '0xFd8ea2e5e8591fA791d44731499cDF2e81CD6a41',
      abi: VestingRegistryABI as any,
    },
    vestingRegistry3: {
      address: '0xFd8ea2e5e8591fA791d44731499cDF2e81CD6a41',
      abi: VestingRegistryABI as any,
    },
    priceFeed: {
      address: '0x7f38c422b99075f63C9c919ECD200DF8d2Cf5BD4',
      abi: priceFeedsAbi as any,
    },
    swapNetwork: {
      address: '0x61172B53423E205a399640e5283e51FE60EC2256',
      abi: SwapNetworkABI as any,
    },
    feeSharingProxy: {
      address: '0xd38CF0A39FB86CF8fA481056aAAd437515817054',
      abi: feeSharingProxyAbi as any,
    },
    DOC_token: {
      address: '0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0',
      abi: tokenAbi as any,
    },
    DOC_itoken: {
      address: '0x74e00A8CeDdC752074aad367785bFae7034ed89f',
      abi: tokenAbi as any,
    },
    RBTC_token: {
      address: '0x69FE5cEC81D5eF92600c1A0dB1F11986AB3758Ab',
      abi: abiTestWBRTCToken as any,
    },
    RBTC_itoken: {
      address: '0xe67Fe227e0504e8e96A34C3594795756dC26e14B',
      abi: abiTestWBRTCToken as any,
    },
    USDT_token: {
      address: '0x4d5a316d23ebe168d8f887b4447bf8dbfa4901cc',
      abi: tokenAbi as any,
    },
    USDT_itoken: {
      address: '0xd1f225BEAE98ccc51c468d1E92d0331c4f93e566',
      abi: tokenAbi as any,
    },
    BPRO_token: {
      address: '0x4da7997a819bb46b6758b9102234c289dd2ad3bf',
      abi: tokenAbi as any,
    },
    BPRO_itoken: {
      address: '0x6226b4B3F29Ecb5f9EEC3eC3391488173418dD5d',
      abi: tokenAbi as any,
    },
    SOV_token: {
      address: '0xFA2d9683757D1b6C2fE590873E3960Ee2B3ED72d',
      abi: tokenAbi as any,
    },
    multicall: {
      address: '0x9e469e1fc7fb4c5d17897b68eaf1afc9df39f103',
      abi: multicallABI as any,
    },
  },
  mainnet: {
    sovToken: {
      address: '0xEFc78fc7d48b64958315949279Ba181c2114ABBd',
      abi: SovTokenABI as any,
    },
    staking: {
      address: '0x5684a06CaB22Db16d901fEe2A5C081b4C91eA40e',
      abi: StakingABI as any,
    },
    governorAdmin: {
      address: '0xfaB3D992d850C4a76f9b1E67ef4BF7d6812e71b9',
      abi: GovernorAdminABI as any,
    },
    governorOwner: {
      address: '0xfaB3D992d850C4a76f9b1E67ef4BF7d6812e71b9',
      abi: GovernorAdminABI as any,
    },
    vestingRegistry: {
      address: '0x80B036ae59B3e38B573837c01BB1DB95515b7E6B',
      abi: VestingRegistryABI as any,
    },
    vestingRegistry2: {
      address: '0x0a9bDbf5e104a30fb4c99f6812FB85B60Fd8D372',
      abi: VestingRegistryABI as any,
    },
    vestingRegistry3: {
      address: '0x14F3FE332e21Ef3f5d244C45C8D5fbFcEF2FB5c9',
      abi: VestingRegistryABI as any,
    },
    priceFeed: {
      address: '0x437AC62769f386b2d238409B7f0a7596d36506e4',
      abi: priceFeedsAbi as any,
    },
    swapNetwork: {
      address: '0x98aCE08D2b759a265ae326F010496bcD63C15afc',
      abi: SwapNetworkABI as any,
    },
    feeSharingProxy: {
      address: '0x12B1B0C67d9A771EB5Db7726d23fdc6848fd93ef',
      abi: feeSharingProxyAbi as any,
    },
    DOC_token: {
      address: '0xe700691da7b9851f2f35f8b8182c69c53ccad9db',
      abi: tokenAbi as any,
    },
    DOC_itoken: {
      address: '0xd8D25f03EBbA94E15Df2eD4d6D38276B595593c1',
      abi: tokenAbi as any,
    },
    RBTC_token: {
      address: '0x542fDA317318eBF1d3DEAf76E0b632741A7e677d',
      abi: abiTestWBRTCToken as any,
    },
    RBTC_itoken: {
      address: '0xa9DcDC63eaBb8a2b6f39D7fF9429d88340044a7A',
      abi: abiTestWBRTCToken as any,
    },
    USDT_token: {
      address: '0xef213441a85df4d7acbdae0cf78004e1e486bb96',
      abi: tokenAbi as any,
    },
    USDT_itoken: {
      address: '0x849C47f9C259E9D62F289BF1b2729039698D8387',
      abi: tokenAbi as any,
    },
    BPRO_token: {
      address: '0x440cd83c160de5c96ddb20246815ea44c7abbca8',
      abi: tokenAbi as any,
    },
    BPRO_itoken: {
      address: '0x6E2fb26a60dA535732F8149b25018C9c0823a715',
      abi: tokenAbi as any,
    },
    SOV_token: {
      address: '0xEFc78fc7d48b64958315949279Ba181c2114ABBd',
      abi: tokenAbi as any,
    },
    multicall: {
      address: '0x6c62bf5440de2cb157205b15c424bceb5c3368f5',
      abi: multicallABI as any,
    },
  },
};
