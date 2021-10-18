import { PublicKey } from "@solana/web3.js";

export type Action = {
  type: ActionType;
  item: any;
};

export enum ActionType {
  CommonTriggerShutdown,
  CommonDidShutdown,
  CommonWalletDidConnect,
  CommonWalletDidDisconnect,
  CommonWalletSetProvider,
  CommonSetNetwork,
}

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  let newState = {
    common: { ...state.common },
  };
  switch (action.type) {
    case ActionType.CommonWalletSetProvider:
      newState.common.walletProvider = action.item.walletProvider;
      return newState;
    case ActionType.CommonWalletDidConnect:
      newState.common.isWalletConnected = true;
      return newState;
    case ActionType.CommonWalletDidDisconnect:
      newState.common.isWalletConnected = false;
      return newState;
    case ActionType.CommonSetNetwork:
      if (newState.common.network.label !== action.item.network.label) {
        newState.common.network = action.item.network;
      }
      return newState;
    default:
      return newState;
  }
}

export type State = {
  common: CommonState;
};

export type CommonState = {
  walletProvider?: string;
  isWalletConnected: boolean;
  network: Network;
};

export const networks: Networks = {
  mainnet: {
    // Cluster.
    label: "Serum Mainnet Beta",
    url: "https://solana-api.projectserum.com",
    explorerClusterSuffix: "",
    multisigProgramId: new PublicKey(
      "A9HAbnCwoD6f2NkZobKFf6buJoN9gUVVvX5PoUnDHS6u"
    ),
    multisigUpgradeAuthority: new PublicKey(
      "GZXtZrRTaazATgJpWKReqUEYE6L2CSQRHkFnXQDPA2vD"
    ),
  },
  solanaapi: {
    //mainnet dev butler
    label: "Mainnet Beta",
    url: "https://api.mainnet-beta.solana.com",
    explorerClusterSuffix: "",
    multisigProgramId: new PublicKey(
      "BUTLnacqLDizkNtsT42sBTU8V8yEhsoQ5Ua1kYeK8Rc"
    ),
    multisigUpgradeAuthority: new PublicKey(
      "DGxwJac9TP7fUQsan4UmWAfyZ4UGstiaZRL9FnDWeWaU" //butler test, PDA: iPjLxFuW8NApjwgDrnWJgWZUnQ145Qzqaah51DZiu8a
    ),
  },
  rpcpool: {
    //mainnet production
    label: "RPCPool Mainnet",
    url: "https://parrot.rpcpool.com",
    explorerClusterSuffix: "",
    multisigProgramId: new PublicKey(
      "BUTLnacqLDizkNtsT42sBTU8V8yEhsoQ5Ua1kYeK8Rc"
    ),
    multisigUpgradeAuthority: new PublicKey(
      "6cZp8BuVieLpRd3dc6ScYwdTntMsxQFAX1ZRDdRCvAPp" //production, PDA: GqKxXbj6LdMKLvfbGjqTxJYmGpLLL7kjLREwbdsGpmsW
    ),
  },
  devnet: {
    // Cluster.
    label: "Devnet",
    url: "https://api.devnet.solana.com",
    explorerClusterSuffix: "devnet",
    multisigProgramId: new PublicKey(
      "BUTLnacqLDizkNtsT42sBTU8V8yEhsoQ5Ua1kYeK8Rc"
    ),
    multisigUpgradeAuthority: new PublicKey(
      "5Qu2zgDiWW4X38qwTxDZ6TayEGypZ48yj2NQ2eBLAApq" //PDA 3kRsqgw1Rneu9DcG5wV49Xn7WFgqztCwidgHGrjKSUND
    ),
  },
  // Fill in with your local cluster addresses.
  localhost: {
    // Cluster.
    label: "Localhost",
    url: "http://localhost:8899",
    explorerClusterSuffix: "localhost",
    multisigProgramId: new PublicKey(
      "9z7Pq56To96qbVLzuBcf47Lc7u8uUWZh6k5rhcaTsDjz"
    ),
  },
};

export const initialState: State = {
  common: {
    isWalletConnected: false,
    walletProvider: "https://www.sollet.io",
    network: networks.solanaapi,
  },
};

type Networks = { [label: string]: Network };

export type Network = {
  // Cluster.
  label: string;
  url: string;
  explorerClusterSuffix: string;
  multisigProgramId: PublicKey;
  multisigUpgradeAuthority?: PublicKey;
};
