"use client";

import Game from "@/components/Game/game";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

const GamePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const player1 = searchParams.get("player1");
    const player2 = searchParams.get("player2");

    const [players, setPlayers] = useState({ player1: '', player2: '' });
    
    useEffect(() => {
        if (player1 && player2) {
            setPlayers({ player1, player2 });
        } else {
            router.push("/setup");
        }
    }, [player1, player2, router]);

    if (!players.player1 || !players.player2) {
        return <div>Loading...</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-3xl font-bold">Game</h1>
                <Game player1={players.player1} player2={players.player2} />
            </div>
        </Suspense>
    );
};

export default GamePage;