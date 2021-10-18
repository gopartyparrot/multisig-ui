import { Idl } from "@project-serum/anchor";

const idl: Idl = {
  version: "0.0.0",
  name: "serum_multisig",
  instructions: [
    {
      name: "createMultisig",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "owners",
          type: {
            vec: "publicKey",
          },
        },
        {
          name: "threshold",
          type: "u64",
        },
        {
          name: "nonce",
          type: "u8",
        },
      ],
    },
    {
      name: "createTransaction",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transaction",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "pid",
          type: "publicKey",
        },
        {
          name: "accs",
          type: {
            vec: {
              defined: "TransactionAccount",
            },
          },
        },
        {
          name: "data",
          type: "bytes",
        },
      ],
    },
    {
      name: "approve",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transaction",
          isMut: true,
          isSigner: false,
        },
        {
          name: "owner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [],
    },
    {
      name: "setOwnersAndChangeThreshold",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "owners",
          type: {
            vec: "publicKey",
          },
        },
        {
          name: "threshold",
          type: "u64",
        },
      ],
    },
    {
      name: "setOwners",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "owners",
          type: {
            vec: "publicKey",
          },
        },
      ],
    },
    {
      name: "changeThreshold",
      accounts: [
        {
          name: "multisig",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "threshold",
          type: "u64",
        },
      ],
    },
    {
      name: "executeTransaction",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "transaction",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "createAllowedInstructions",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "allowedInstructions",
          isMut: true,
          isSigner: false,
        },
        {
          name: "proposer",
          isMut: false,
          isSigner: true,
        },
        {
          name: "rent",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "addAllowedInstruction",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "allowedInstructions",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "description",
          type: "bytes",
        },
        {
          name: "pid",
          type: "publicKey",
        },
        {
          name: "delegate",
          type: "publicKey",
        },
        {
          name: "instrAccounts",
          type: {
            vec: {
              defined: "TransactionAccount",
            },
          },
        },
        {
          name: "dataPrefix",
          type: "bytes",
        },
      ],
    },
    {
      name: "removeAllowedInstruction",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "allowedInstructions",
          isMut: true,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "index",
          type: "u16",
        },
      ],
    },
    {
      name: "executeAllowedTransaction",
      accounts: [
        {
          name: "multisig",
          isMut: false,
          isSigner: false,
        },
        {
          name: "allowedInstructions",
          isMut: false,
          isSigner: false,
        },
        {
          name: "multisigSigner",
          isMut: false,
          isSigner: false,
        },
        {
          name: "proposer",
          isMut: false,
          isSigner: true,
        },
      ],
      args: [
        {
          name: "allowedIndex",
          type: "u16",
        },
        {
          name: "pid",
          type: "publicKey",
        },
        {
          name: "accs",
          type: {
            vec: {
              defined: "TransactionAccount",
            },
          },
        },
        {
          name: "data",
          type: "bytes",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "Multisig",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owners",
            type: {
              vec: "publicKey",
            },
          },
          {
            name: "threshold",
            type: "u64",
          },
          {
            name: "nonce",
            type: "u8",
          },
          {
            name: "ownerSetSeqno",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "Transaction",
      type: {
        kind: "struct",
        fields: [
          {
            name: "multisig",
            type: "publicKey",
          },
          {
            name: "programId",
            type: "publicKey",
          },
          {
            name: "accounts",
            type: {
              vec: {
                defined: "TransactionAccount",
              },
            },
          },
          {
            name: "data",
            type: "bytes",
          },
          {
            name: "signers",
            type: {
              vec: "bool",
            },
          },
          {
            name: "didExecute",
            type: "bool",
          },
          {
            name: "ownerSetSeqno",
            type: "u32",
          },
        ],
      },
    },
    {
      name: "AllowedInstructions",
      type: {
        kind: "struct",
        fields: [
          {
            name: "multisig",
            type: "publicKey",
          },
          {
            name: "instructions",
            type: {
              vec: {
                defined: "AllowedInstruction",
              },
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "TransactionAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "pubkey",
            type: "publicKey",
          },
          {
            name: "isSigner",
            type: "bool",
          },
          {
            name: "isWritable",
            type: "bool",
          },
        ],
      },
    },
    {
      name: "AllowedInstruction",
      type: {
        kind: "struct",
        fields: [
          {
            name: "description",
            type: "bytes",
          },
          {
            name: "delegate",
            type: "publicKey",
          },
          {
            name: "programId",
            type: "publicKey",
          },
          {
            name: "dataPrefix",
            type: "bytes",
          },
          {
            name: "accounts",
            type: {
              vec: {
                defined: "TransactionAccount",
              },
            },
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 300,
      name: "InvalidOwner",
      msg: "The given owner is not part of this multisig.",
    },
    {
      code: 301,
      name: "NotEnoughSigners",
      msg: "Not enough owners signed this transaction.",
    },
    {
      code: 302,
      name: "TransactionAlreadySigned",
      msg: "Cannot delete a transaction that has been signed by an owner.",
    },
    {
      code: 303,
      name: "Overflow",
      msg: "Overflow when adding.",
    },
    {
      code: 304,
      name: "UnableToDelete",
      msg: "Cannot delete a transaction the owner did not create.",
    },
    {
      code: 305,
      name: "AlreadyExecuted",
      msg: "The given transaction has already been executed.",
    },
    {
      code: 306,
      name: "InvalidThreshold",
      msg: "Threshold must be less than or equal to the number of owners.",
    },
    {
      code: 307,
      name: "NotAllowedInstruction",
      msg: "Not a allowed instruction",
    },
    {
      code: 308,
      name: "NotAllowedDelegator",
      msg: "Not allowed delegator",
    },
  ],
};

export default idl;
