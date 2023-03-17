export class EventManager {
  private listeners: Map<string, any[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: any) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);

    return listener;
  }

  emit(event: string, payload: any) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event)?.forEach((listener) => listener(payload));
  }

  removeListener(event: string, listenerToRemove: any) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.set(
      event,
      this.listeners
        .get(event)
        ?.filter((listener) => listener !== listenerToRemove) || [],
    );
  }
}
