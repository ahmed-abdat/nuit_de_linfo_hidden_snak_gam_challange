'use client';

import { useCallback, useRef, useEffect } from 'react';

type SoundType = 'boot' | 'error' | 'eat' | 'gameOver' | 'click' | 'start';

interface RetroSoundsOptions {
  enabled?: boolean;
  volume?: number;
}

export function useRetroSounds(options: RetroSoundsOptions = {}) {
  const { enabled = true, volume = 0.3 } = options;
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timeoutIdsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const isUnmountedRef = useRef(false);

  // Initialize AudioContext lazily (requires user interaction)
  const getAudioContext = useCallback(() => {
    // Check if context exists and is still usable
    if (audioContextRef.current && audioContextRef.current.state === 'closed') {
      audioContextRef.current = null;
      gainNodeRef.current = null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = volume;
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }
    return { ctx: audioContextRef.current, gain: gainNodeRef.current! };
  }, [volume]);

  // Update volume when it changes
  useEffect(() => {
    if (gainNodeRef.current && audioContextRef.current?.state !== 'closed') {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Play an oscillator-based sound
  const playTone = useCallback((
    frequency: number,
    duration: number,
    type: OscillatorType = 'square',
    fadeOut: boolean = true
  ) => {
    // Skip if disabled, unmounted, or context is closed
    if (!enabled || isUnmountedRef.current) return;

    try {
      const { ctx, gain } = getAudioContext();

      // Double-check context state after getting it
      if (ctx.state === 'closed') return;

      const oscillator = ctx.createOscillator();
      const noteGain = ctx.createGain();

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      noteGain.gain.setValueAtTime(volume, ctx.currentTime);
      if (fadeOut) {
        noteGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      }

      oscillator.connect(noteGain);
      noteGain.connect(gain);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch {
      // Audio context may not be available
    }
  }, [enabled, volume, getAudioContext]);

  // Play a sequence of tones
  const playSequence = useCallback((
    notes: Array<{ freq: number; dur: number; delay: number }>,
    type: OscillatorType = 'square'
  ) => {
    if (!enabled || isUnmountedRef.current) return;

    notes.forEach(({ freq, dur, delay }) => {
      const timeoutId = setTimeout(() => {
        timeoutIdsRef.current.delete(timeoutId);
        // Check again before playing (component might have unmounted)
        if (!isUnmountedRef.current) {
          playTone(freq, dur, type);
        }
      }, delay * 1000);
      timeoutIdsRef.current.add(timeoutId);
    });
  }, [enabled, playTone]);

  // Predefined retro sounds
  const playSound = useCallback((soundType: SoundType) => {
    if (!enabled || isUnmountedRef.current) return;

    switch (soundType) {
      case 'boot':
        // Classic GameBoy boot sound - rising arpeggio
        playSequence([
          { freq: 131, dur: 0.1, delay: 0 },      // C3
          { freq: 165, dur: 0.1, delay: 0.1 },    // E3
          { freq: 196, dur: 0.1, delay: 0.2 },    // G3
          { freq: 262, dur: 0.15, delay: 0.3 },   // C4
          { freq: 330, dur: 0.15, delay: 0.45 },  // E4
          { freq: 392, dur: 0.2, delay: 0.6 },    // G4
          { freq: 523, dur: 0.3, delay: 0.8 },    // C5
        ], 'square');
        break;

      case 'error':
        // Error buzzer - descending harsh tones
        playSequence([
          { freq: 200, dur: 0.15, delay: 0 },
          { freq: 150, dur: 0.15, delay: 0.15 },
          { freq: 100, dur: 0.3, delay: 0.3 },
        ], 'sawtooth');
        break;

      case 'eat':
        // Quick blip for eating food
        playSequence([
          { freq: 440, dur: 0.05, delay: 0 },
          { freq: 880, dur: 0.08, delay: 0.05 },
        ], 'square');
        break;

      case 'gameOver':
        // Sad descending melody
        playSequence([
          { freq: 392, dur: 0.2, delay: 0 },      // G4
          { freq: 330, dur: 0.2, delay: 0.2 },    // E4
          { freq: 262, dur: 0.2, delay: 0.4 },    // C4
          { freq: 196, dur: 0.4, delay: 0.6 },    // G3
          { freq: 131, dur: 0.5, delay: 1.0 },    // C3
        ], 'triangle');
        break;

      case 'click':
        // Button click
        playTone(800, 0.03, 'square');
        break;

      case 'start':
        // Game start fanfare
        playSequence([
          { freq: 262, dur: 0.1, delay: 0 },      // C4
          { freq: 330, dur: 0.1, delay: 0.1 },    // E4
          { freq: 392, dur: 0.1, delay: 0.2 },    // G4
          { freq: 523, dur: 0.25, delay: 0.3 },   // C5
        ], 'square');
        break;
    }
  }, [enabled, playTone, playSequence]);

  // Cleanup
  useEffect(() => {
    isUnmountedRef.current = false;

    return () => {
      isUnmountedRef.current = true;

      // Clear all pending timeouts
      timeoutIdsRef.current.forEach(id => clearTimeout(id));
      timeoutIdsRef.current.clear();

      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {
          // Ignore errors if context is already closed
        });
      }
    };
  }, []);

  return {
    playSound,
    playTone,
    playSequence,
  };
}
