"use client";
import { useEffect, useState } from "react";
interface Props {
  onComplete: () => void;
  ready?: boolean;
}
export const LoadingScreen = ({ onComplete, ready = true }: Props) => {
  const [minimumElapsed, setMinimumElapsed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMinimumElapsed(true), 650);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    if (!ready || !minimumElapsed) return;
    setLeaving(true);
    const timer = setTimeout(
      onComplete,
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320,
    );
    return () => clearTimeout(timer);
  }, [ready, minimumElapsed, onComplete]);
  return (
    <div
      className={`ef-splash ${leaving ? "ef-splash-leaving" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="ef-splash-inner">
        <div className="ef-loader-emblem" aria-hidden="true">
          <span>ef</span>
          <i />
          <i />
        </div>
        <div className="ef-splash-word">
          evloev<span>film</span>
        </div>
        <p>Хорошие истории начинаются здесь</p>
        <div className="ef-loading-track" aria-hidden="true">
          <span />
        </div>
        <small>{ready ? "Почти готово" : "Подготавливаем пространство"}</small>
      </div>
    </div>
  );
};
