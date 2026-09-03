/**
 * Polyfills loaded before the app. Zone.js flags must be set before zone.js
 * itself is imported, so they live in zone-flags.ts.
 */
import './zone-flags';

import 'zone.js';
