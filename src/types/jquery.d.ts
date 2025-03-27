import * as $ from 'jquery'; // Ensure jQuery is imported

declare global {
  interface JQuery {
    mathquill(action?: string, value?: string): string;
  }
}

export {}; // Ensure this file is treated as a module
