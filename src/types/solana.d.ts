declare module '@/lib/solana' {
    export const connection: import('@solana/web3.js').Connection;
    export const sendTransaction: (
      payer: import('@solana/web3.js').PublicKey,
      receiver: import('@solana/web3.js').PublicKey,
      amount: number,
      signTransaction: (transaction: import('@solana/web3.js').Transaction) => Promise<import('@solana/web3.js').Transaction>
    ) => Promise<string>;
  }
  