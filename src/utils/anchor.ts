import { Program, ProgramAccount } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import * as sha256 from "js-sha256";

export async function legacyAnchorAll(
  program: Program,
  idlAccountName: string,
  filter?: Buffer
): Promise<ProgramAccount<any>[]> {
  let bytes = await accountDiscriminator(idlAccountName);
  if (filter !== undefined) {
    bytes = Buffer.concat([bytes, filter]);
  }
  // @ts-ignore
  const resp = await program.provider.connection["_rpcRequest"](
    "getProgramAccounts",
    [
      program.programId.toBase58(),
      {
        commitment: program.provider.connection.commitment,
        encoding: "base64",
        filters: [
          {
            memcmp: {
              offset: 0,
              bytes: bs58.encode(bytes),
            },
          },
        ],
      },
    ]
  );
  if (resp.error) {
    console.error(resp);
    throw new Error("Failed to get accounts");
  }
  // @ts-ignore
  return resp.result.map(({ pubkey, account: { data } }) => {
    return {
      publicKey: new PublicKey(pubkey),
      account: program.coder.accounts.decode(
        idlAccountName,
        Buffer.from(data[0], "base64")
      ),
    };
  });
}

async function accountDiscriminator(name: string): Promise<Buffer> {
  // @ts-ignore
  return Buffer.from(sha256.digest(`account:${name}`)).slice(0, 8);
}
