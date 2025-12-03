'use client';

import { useCallback, useRef, useEffect } from 'react';

type SoundType =
  | 'boot'
  | 'error'
  | 'eat'
  | 'gameOver'
  | 'click'
  | 'start'
  | 'select'   // Menu navigation
  | 'confirm'  // Difficulty selected
  | 'hit'      // Hit obstacle
  | 'levelUp'; // New obstacle spawns

interface RetroSoundsOptions {
  enabled?: boolean;
  volume?: number;
  /** Minimum ms between same sound plays (default: 50) */
  cooldown?: number;
}

// Sound cooldowns to prevent spam (in ms)
const SOUND_COOLDOWNS: Record<SoundType, number> = {
  eat: 80,        // Fast but not instant
  click: 30,      // Very quick
  select: 50,     // Quick
  start: 500,     // Prevent double-start
  gameOver: 1000, // Only once
  boot: 1000,     // Only once
  error: 300,     // Allow some repetition
  confirm: 200,   // Moderate
  hit: 100,       // Allow quick hits
  levelUp: 300,   // Moderate
};

export function useRetroSounds(options: RetroSoundsOptions = {}) {
  const { enabled = true, volume = 0.3, cooldown = 50 } = options;
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timeoutIdsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const isUnmountedRef = useRef(false);
  // Track last play time for each sound type
  const lastPlayTimeRef = useRef<Map<SoundType, number>>(new Map());

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

  // Check if sound is on cooldown
  const isOnCooldown = useCallback((soundType: SoundType): boolean => {
    const lastPlayTime = lastPlayTimeRef.current.get(soundType);
    if (!lastPlayTime) return false;

    const soundCooldown = SOUND_COOLDOWNS[soundType] || cooldown;
    return Date.now() - lastPlayTime < soundCooldown;
  }, [cooldown]);

  // Predefined retro sounds
  const playSound = useCallback((soundType: SoundType) => {
    if (!enabled || isUnmountedRef.current) return;

    // Check cooldown to prevent spam
    if (isOnCooldown(soundType)) return;

    // Record play time
    lastPlayTimeRef.current.set(soundType, Date.now());

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

      case 'select':
        // Menu navigation - short blip
        playTone(440, 0.04, 'square');
        break;

      case 'confirm':
        // Difficulty selected - rising confirmation tone
        playSequence([
          { freq: 523, dur: 0.08, delay: 0 },     // C5
          { freq: 659, dur: 0.08, delay: 0.08 },  // E5
          { freq: 784, dur: 0.12, delay: 0.16 },  // G5
        ], 'square');
        break;

      case 'hit':
        // Hit obstacle - low thud with impact
        playSequence([
          { freq: 80, dur: 0.08, delay: 0 },
          { freq: 60, dur: 0.15, delay: 0.05 },
          { freq: 40, dur: 0.2, delay: 0.1 },
        ], 'sawtooth');
        break;

      case 'levelUp':
        // New obstacle spawns - alert tone
        playSequence([
          { freq: 660, dur: 0.06, delay: 0 },     // E5
          { freq: 880, dur: 0.06, delay: 0.06 },  // A5
          { freq: 660, dur: 0.08, delay: 0.12 },  // E5
        ], 'triangle');
        break;
    }
  }, [enabled, playTone, playSequence, isOnCooldown]);

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
