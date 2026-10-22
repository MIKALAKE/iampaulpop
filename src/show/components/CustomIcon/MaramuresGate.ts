import { createLucideIcon } from 'lucide-react';

// Maramureș wooden gate: steep shingle roof, carved beam, the big carriage arch
// and the small pedestrian door. Drawn on lucide's 24px grid so it sits with the
// rest of the icon set.
const MaramuresGate = createLucideIcon('maramures-gate', [
  ['path', { d: 'M1.5 8 5.5 3.5h13l4 4.5z', key: 'roof' }],
  ['path', { d: 'M3.5 8v13', key: 'post-left' }],
  ['path', { d: 'M15.5 8v13', key: 'post-middle' }],
  ['path', { d: 'M20.5 8v13', key: 'post-right' }],
  ['path', { d: 'M3.5 10.5h17', key: 'beam' }],
  ['path', { d: 'M3.5 16.5q6-7 12 0', key: 'arch' }],
  ['path', { d: 'M15.5 14h5', key: 'door' }],
]);

export default MaramuresGate;
