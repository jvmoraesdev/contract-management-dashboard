'use client';

import React from 'react';
import Home from '@/components/pages/Home/Home';
import { SideBar } from '@/components/shared/SideBar/SideBar';

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <SideBar />
      <Home />
    </div>
  );
}
