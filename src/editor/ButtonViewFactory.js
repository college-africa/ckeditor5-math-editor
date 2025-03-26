"use strict";

EquationEditor.ButtonViewFactory = {
  create: function (config) {
    var buttonConfig, buttons, i, klass, len;
    buttons = [];
    for (i = 0, len = config.length; i < len; i++) {
      buttonConfig = config[i];
      klass = eval(buttonConfig.klass);
      buttons.push(new klass(buttonConfig));
    }
    return buttons;
  }
};