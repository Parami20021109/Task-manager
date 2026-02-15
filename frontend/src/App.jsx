import { useState } from 'react';
import TaskList from './components/TaskList';
import Background3D from './components/Background3D';

function App() {
  return (
    <div className="min-h-screen text-white relative">
      <Background3D />

      <main className="container mx-auto px-4 py-8 relative z-10">
        <TaskList />
      </main>

      <footer className="text-center py-6 text-gray-400 text-sm relative z-10">
        <p>© {new Date().getFullYear()} Task Manager. Built with React, Three.js & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
