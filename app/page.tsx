"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStartGame = () => {
    router.push("/setup");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Button size="lg" onClick={handleStartGame}>Start Game</Button>
    </main>
  );
}
