import { EventManager } from './emitter';

export const clearFormEventManager = new EventManager();

export function clearForms() {
  clearFormEventManager.emit('clear-form', 'all');
}
