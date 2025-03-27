interface EventHandler {
  callback: (...args: any[]) => void;
  context: any;
}

interface EventMap {
  [eventName: string]: EventHandler[];
}

class EventEmitter {
  private _events: EventMap = {};

  /**
   * Register an event listener
   * @param name Event name to listen for
   * @param callback Function to call when event is triggered
   * @param context Context to bind the callback to (optional)
   * @returns The number of listeners for this event
   */
  on(name: string, callback: (...args: any[]) => void, context?: any): number {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push({
      callback,
      context: context || this,
    });

    return this._events[name].length;
  }

  /**
   * Trigger an event with optional arguments
   * @param name Event name to trigger
   * @param args Arguments to pass to event handlers
   */
  trigger(name: string, ...args: any[]): void {
    if (!this._events?.[name]) {
      return;
    }

    const events = this._events[name];
    this.triggerEvents(events, args);
  }

  /**
   * Internal method to call event handlers
   * @param events Array of event handlers
   * @param args Arguments to pass to event handlers
   */
  private triggerEvents(events: EventHandler[], args: any[]): void {
    events.forEach((event) => {
      event.callback.call(event.context, ...args);
    });
  }

  /**
   * Remove all listeners for a specific event
   * @param name Event name to remove listeners from
   */
  removeAllListeners(name: string): void {
    if (this._events?.[name]) {
      delete this._events[name];
    }
  }

  /**
   * Remove a specific listener
   * @param name Event name
   * @param callback Specific callback to remove
   */
  off(name: string, callback: (...args: any[]) => void): void {
    if (!this._events?.[name]) {
      return;
    }

    this._events[name] = this._events[name].filter(
      (event) => event.callback !== callback
    );
  }
}

// // Create a global instance for backwards compatibility
// namespace MathEditor {
//   export const Events = new EventEmitter();
// }

// // Make available globally if needed
// (window as any).MathEditor = MathEditor;

export default EventEmitter;

export const events = new EventEmitter();
