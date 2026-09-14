'use client';

import { motion } from 'framer-motion';

const flock = [
  { top: '13%', left: '-12%', scale: .72, duration: 19, delay: 0 },
  { top: '21%', left: '-18%', scale: .46, duration: 24, delay: 4 },
  { top: '10%', left: '-25%', scale: .32, duration: 28, delay: 8 },
  { top: '31%', left: '-22%', scale: .55, duration: 22, delay: 12 },
  { top: '17%', left: '-35%', scale: .24, duration: 30, delay: 15 },
];

function Bird({ scale }: { scale: number }) {
  return (
    <motion.svg viewBox="0 0 160 90" width="160" height="90" style={{ scale }} aria-hidden="true" className="drop-shadow-[0_2px_5px_rgba(0,0,0,.3)]">
      <motion.path
        d="M78 47 C62 33 42 24 16 29 C34 36 48 44 62 55 C47 47 29 44 9 49 C31 56 51 64 72 60 C77 59 81 55 84 51 Z"
        fill="rgba(14,20,16,.86)"
        animate={{ d: [
          'M78 47 C62 33 42 24 16 29 C34 36 48 44 62 55 C47 47 29 44 9 49 C31 56 51 64 72 60 C77 59 81 55 84 51 Z',
          'M78 47 C59 48 38 58 15 73 C35 70 51 64 67 56 C49 62 31 72 12 84 C36 78 56 68 74 57 C80 53 82 50 84 49 Z',
          'M78 47 C62 33 42 24 16 29 C34 36 48 44 62 55 C47 47 29 44 9 49 C31 56 51 64 72 60 C77 59 81 55 84 51 Z'
        ] }} transition={{ duration: .95, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M84 51 C91 38 104 29 128 30 C111 38 101 45 96 54 C113 46 131 45 151 50 C130 58 112 63 94 59 C89 58 86 55 84 51 Z"
        fill="rgba(14,20,16,.86)"
        animate={{ d: [
          'M84 51 C91 38 104 29 128 30 C111 38 101 45 96 54 C113 46 131 45 151 50 C130 58 112 63 94 59 C89 58 86 55 84 51 Z',
          'M84 49 C93 48 111 58 136 73 C116 70 100 64 91 56 C109 62 128 72 148 84 C124 78 103 68 88 57 C85 54 84 52 84 49 Z',
          'M84 51 C91 38 104 29 128 30 C111 38 101 45 96 54 C113 46 131 45 151 50 C130 58 112 63 94 59 C89 58 86 55 84 51 Z'
        ] }} transition={{ duration: .95, repeat: Infinity, ease: 'easeInOut' }}
      />
      <ellipse cx="82" cy="50" rx="8" ry="6" fill="rgba(14,20,16,.92)" />
      <circle cx="88" cy="48" r="1.4" fill="rgba(226,193,126,.8)" />
    </motion.svg>
  );
}

export default function FlyingBirds() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden" aria-hidden="true">
      {flock.map((bird, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ top: bird.top, left: bird.left }}
          animate={{ x: ['0vw', '36vw', '110vw'], y: [0, -18, 8, -10, 0], rotate: [0, 1.5, -1, 1, 0] }}
          transition={{
            x: { duration: bird.duration, delay: bird.delay, repeat: Infinity, ease: 'linear' },
            y: { duration: 5.5, delay: bird.delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 5.5, delay: bird.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <Bird scale={bird.scale} />
        </motion.div>
      ))}
    </div>
  );
}
