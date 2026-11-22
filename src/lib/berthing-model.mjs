import { readinessChecks } from '../data/berthing-exercises.js';

const arrivalIds = readinessChecks.filter(check => check.phase === 'arrival').map(check => check.id);
const workIds = readinessChecks.filter(check => check.phase === 'work').map(check => check.id);

// Summarize teaching conditions only; completion never grants passage or permission to work.
export function evaluateBerthingReadiness(checkedIds) {
  const checked = new Set(Array.isArray(checkedIds) ? checkedIds : []);
  const arrivalMissing = arrivalIds.filter(id => !checked.has(id));
  const workMissing = workIds.filter(id => !checked.has(id));
  const arrivalComplete = arrivalMissing.length === 0;

  return {
    arrivalMissing,
    workMissing,
    arrivalComplete,
    workComplete: arrivalComplete && workMissing.length === 0,
  };
}
