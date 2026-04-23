'use client';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const UACtx = createContext({ on: false });

export function UAProvider({ children }) {
  const [on, setOn] = useState(false);

  useKonami(
    useCallback(() => {
      setOn(true);
      const t = setTimeout(() => setOn(false), 10000);
      return () => clearTimeout(t);
    }, [])
  );

  return (
    <UACtx.Provider value={{ on }}>
      <div className={`ua-stripe ${on ? 'on' : ''}`} aria-hidden="true">
        <div className="a" />
        <div className="b" />
      </div>
      {children}
    </UACtx.Provider>
  );
}

export function useUA() {
  return useContext(UACtx);
}

function useKonami(cb) {
  useEffect(() => {
    const seq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let buf = [];
    const onKey = (e) => {
      buf.push(e.key);
      if (buf.length > seq.length) buf = buf.slice(-seq.length);
      if (buf.length === seq.length && buf.every((k, i) => k.toLowerCase() === seq[i].toLowerCase())) {
        cb();
        buf = [];
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cb]);
}
