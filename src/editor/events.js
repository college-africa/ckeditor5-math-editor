"use strict";

window.EquationEditor = {};
EquationEditor.Events = {
  on: function (name, callback, context) {
    var base;
    this._events || (this._events = {});
    (base = this._events)[name] || (base[name] = []);
    return this._events[name].push({
      callback: callback,
      context: context || this
    });
  },
  trigger: function (name) {
    var args, events;
    if (!this._events) {
      return;
    }
    args = Array.prototype.slice.call(arguments, 1);
    if (events = this._events[name]) {
      return this.triggerEvents(events, args);
    }
  },
  triggerEvents: function (events, args) {
    var event, i, len, results;
    results = [];
    for (i = 0, len = events.length; i < len; i++) {
      event = events[i];
      results.push(event.callback.call(event.context, ...args));
    }
    return results;
  }
};