"use strict";

EquationEditor.ButtonGroupViewFactory = {
  create: function (config) {
    var buttonGroupConfig, buttonGroups, i, len;
    buttonGroups = [];
    for (i = 0, len = config.length; i < len; i++) {
      buttonGroupConfig = config[i];
      buttonGroupConfig.buttonViews = EquationEditor.ButtonViewFactory.create(buttonGroupConfig.buttonViews);
      buttonGroups.push(new EquationEditor.ButtonGroupView(buttonGroupConfig));
    }
    return buttonGroups;
  }
};