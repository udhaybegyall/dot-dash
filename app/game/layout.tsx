'use client';

import { Suspense } from 'react';
import GamePage from './page';

export default function GameLayout() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GamePage />
    </Suspense>
  );
}
