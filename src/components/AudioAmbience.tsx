"use client";

import { useEffect, useRef } from "react";

interface AudioAmbienceProps {
  isPlaying: boolean;
  scrollProgress: number;
}

export const AudioAmbience: React.FC<AudioAmbienceProps> = ({ isPlaying, scrollProgress }) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        try {
          audioCtxRef.current.suspend();
        } catch {}
      }
      return;
    }

    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (!oscRef.current) {
        // Deep satellite telemetry ambient drone
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const masterGain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(80, ctx.currentTime);

        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.5, ctx.currentTime);
        lfoGain.gain.setValueAtTime(15, ctx.currentTime);

        lfo.connect(osc.frequency);
        osc.connect(masterGain);

        masterGain.gain.setValueAtTime(0.04, ctx.currentTime);
        masterGain.connect(ctx.destination);

        osc.start();
        lfo.start();

        oscRef.current = osc;
        lfoRef.current = lfo;
        gainNodeRef.current = masterGain;
      }
    } catch {
      // Audio context error ignore (e.g. browser autoplay restrictions)
    }

    return () => {
      // Clean up if needed
    };
  }, [isPlaying]);

  // Adjust pitch based on zoom / scrollProgress
  useEffect(() => {
    if (audioCtxRef.current && oscRef.current && isPlaying) {
      const targetFreq = 80 + scrollProgress * 120; // 80Hz in space -> 200Hz on ground
      oscRef.current.frequency.setTargetAtTime(targetFreq, audioCtxRef.current.currentTime, 0.1);
    }
  }, [scrollProgress, isPlaying]);

  return null;
};
