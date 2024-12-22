"use client";

import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import LoadingModal from "../components/LoadingModal";
import Coin from "../components/Coin";
import {
  Connection,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  PublicKey,
} from "@solana/web3.js";

const secretKeyString = process.env.NEXT_PUBLIC_HOUSE_WALLET_SECRET;
if (!secretKeyString) {
  throw new Error("House wallet secret key is missing. Check your environment variables.");
}

// const HOUSE_WALLET_KEYPAIR = Keypair.fromSecretKey(
//   Uint8Array.from(JSON.parse(secretKeyString))
// );

const HOUSE_WALLET_ADDRESS = new PublicKey('bosqY2NZfWMnZdAhezuxHuS9PT37Xrk76691LoZnUBs');

export default function BettingGame() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const [betAmount, setBetAmount] = useState(0.1);
  const [selection, setSelection] = useState<"Heads" | "Tails" | null>(null);
  const [result, setResult] = useState<"Heads" | "Tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [message, setMessage] = useState("");

  const handleBet = async () => {
    if (!connected) {
      setMessage("Please connect your wallet.");
      return;
    }

    if (!selection) {
      setMessage("Please select Heads or Tails.");
      return;
    }

    setIsFlipping(true);
    setMessage("");
    setResult(null);

    const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

    // Create a transaction
    const transaction = new Transaction();

    // Add the bet transaction
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey!,
        toPubkey: HOUSE_WALLET_ADDRESS,
        lamports: betAmount * LAMPORTS_PER_SOL,
      })
    );

    // Simulate coin flip
    const flipResult = Math.random() < 0.5 ? "Heads" : "Tails";
    setTimeout(async () => {
      setResult(flipResult);

      if (flipResult === selection) {
        // User wins, prepare winnings transaction
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: HOUSE_WALLET_ADDRESS,
            toPubkey: publicKey!,
            lamports: betAmount * 2 * LAMPORTS_PER_SOL, // Send back double the bet amount
          })
        );
      }

      try {
        // Send the transaction
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'confirmed');
        
        if (flipResult === selection) {
          setMessage("You won! Your winnings have been sent to your wallet.");
        } else {
          setMessage("You lost. Better luck next time!");
        }
      } catch (error) {
        console.error("Transaction failed:", error);
        setMessage("Transaction failed. Please try again.");
      } finally {
        setIsFlipping(false); // Hide loading modal after result is shown
      }
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 flex flex-col items-center">
        <CardHeader className="flex justify-center items-center">
          <Coin result={result} />
          {message && <p className="mt-4 text-lg text-center">{message}</p>}
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center">
          <LoadingModal isLoading={isFlipping} />
          <div className="mb-4">
            <p>Select your bet:</p>
            <div className="flex gap-4 justify-center">
              <Button
                variant={selection === "Heads" ? "solid" : "outline"}
                style={{
                  backgroundColor: selection === "Heads" ? '#512da8' : 'white',
                  color: selection === "Heads" ? 'white' : 'black',
                }}
                onClick={() => setSelection("Heads")}
              >
                Heads
              </Button>
              <Button
                variant={selection === "Tails" ? "solid" : "outline"}
                style={{
                  backgroundColor: selection === "Tails" ? '#512da8' : 'white',
                  color: selection === "Tails" ? 'white' : 'black',
                }}
                onClick={() => setSelection("Tails")}
              >
                Tails
              </Button>
            </div>
          </div>
          <div className="mb-4">
            <p>Bet Amount (SOL):</p>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <WalletMultiButton className="mb-4" />
          {result && <p className="text-lg mt-4">Result: {result}</p>}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleBet} disabled={isFlipping}>
            {isFlipping ? "Flipping..." : "Place Bet"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}