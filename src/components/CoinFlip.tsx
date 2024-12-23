"use client";

import React, { useState, useEffect } from "react";
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
  PublicKey,
} from "@solana/web3.js";

const secretKeyString = process.env.NEXT_PUBLIC_HOUSE_WALLET_SECRET;
if (!secretKeyString) {
  throw new Error("House wallet secret key is missing. Check your environment variables.");
}

const HOUSE_WALLET_ADDRESS = new PublicKey('bosqY2NZfWMnZdAhezuxHuS9PT37Xrk76691LoZnUBs');

export default function BettingGame() {
  const { connected, publicKey, sendTransaction } = useWallet();
  const [betAmount, setBetAmount] = useState(0.1);
  const [selection, setSelection] = useState<"heads" | "tails" | null>(null);
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [message, setMessage] = useState("");

  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  const logWalletBalance = async () => {
    if (publicKey) {
      const balance = await connection.getBalance(publicKey);
      console.log(`Wallet balance: ${balance / LAMPORTS_PER_SOL} SOL`);
    } else {
      console.log('Wallet not connected');
    }
  };

  useEffect(() => {
    logWalletBalance();
  }, [publicKey]);

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
    const flipResult = Math.random() < 0.5 ? "heads" : "tails";
    setTimeout(async () => {
      setResult(flipResult);
      try {
        // Send the transaction
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'confirmed');
        
        if (flipResult === selection) {
          // Handle winnings without confirmation popup
          // Add your logic here to update the state or UI for winnings
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        setMessage("An error occurred while processing the transaction.");
      } finally {
        setIsFlipping(false);
      }
    }, 1000);
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
                variant={selection === "heads" ? "default" : "outline"}
                style={{
                  backgroundColor: selection === "heads" ? '#512da8' : 'white',
                  color: selection === "heads" ? 'white' : 'black',
                }}
                onClick={() => setSelection("heads")}
              >
                Heads
              </Button>
              <Button
                variant={selection === "tails" ? "default" : "outline"}
                style={{
                  backgroundColor: selection === "tails" ? '#512da8' : 'white',
                  color: selection === "tails" ? 'white' : 'black',
                }}
                onClick={() => setSelection("tails")}
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