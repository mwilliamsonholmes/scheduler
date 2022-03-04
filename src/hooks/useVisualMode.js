
import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  function transition(newMode, replace = false) {
    if (replace) {
      return setMode(newMode)
    }
    setMode(newMode);
    setHistory(prev => [...prev, newMode])
  }


  function back() {
    if (history.length < 2) {
      return;
    }
    const previousMode = history[history.length - 2];
    setMode(previousMode);
    setHistory(prev => prev.slice(0, -1));
  };

  return { mode, transition, back };
}