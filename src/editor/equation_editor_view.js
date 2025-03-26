"use strict";

var ButtonGroup,
  Buttons,
  ref,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
Buttons = EquationEditor.Buttons;
ButtonGroup = EquationEditor.ButtonGroupView;
ref = EquationEditor.EquationEditorView = class EquationEditorView extends EquationEditor.View {
  constructor() {
    super(...arguments);
    this.handleCommandButton = this.handleCommandButton.bind(this);
    this.handleWriteButton = this.handleWriteButton.bind(this);
    this.focus = this.focus.bind(this);
  }
  initialize() {
    this.existingLatex = this.options.existingLatex;
    this.restrictions = this.options.restrictions || {};
    EquationEditor.Events.on('latex:command', this.handleCommandButton, this);
    return EquationEditor.Events.on('latex:write', this.handleWriteButton, this);
  }
  render() {
    $.getJSON('config.json').done(config => {
      this.config = config;
      this.addButtonBar();
      this.addButtonGroups();
      return this.enableMathMagic();
    });
    return this;
  }
  enableMathMagic() {
    this.$('.math-button a').mathquill();
    this.input().mathquill('editable');
    if (this.existingLatex != null) {
      this.input().mathquill('latex', this.existingLatex);
    }
    return this.focus();
  }
  input() {
    return this.$('.math');
  }
  addButtonBar() {
    var button, i, len, ref1, results;
    ref1 = this.buttonBarButtons();
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      button = ref1[i];
      results.push(this.$('.button-bar').append(button.render().$el));
    }
    return results;
  }
  addButtonGroups() {
    var buttonGroup, i, len, ref1, results;
    ref1 = this.buttonGroups();
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      buttonGroup = ref1[i];
      results.push(this.$('.button-groups').append(buttonGroup.render().$el));
    }
    return results;
  }
  buttonBarButtons() {
    return EquationEditor.ButtonViewFactory.create(this.config.buttonBar);
  }
  buttonGroups() {
    var groups;
    groups = this.basicButtonGroups();
    if (!this.restrictions.disallow_intermediate) {
      groups = groups.concat(this.intermediateButtonGroups());
    }
    if (!this.restrictions.disallow_advanced) {
      groups = groups.concat(this.advancedButtonGroups());
    }
    return groups;
  }
  basicButtonGroups() {
    return EquationEditor.ButtonGroupViewFactory.create(this.config.buttonGroups.basic);
  }
  intermediateButtonGroups() {
    return EquationEditor.ButtonGroupViewFactory.create(this.config.buttonGroups.intermediate);
  }
  advancedButtonGroups() {
    return EquationEditor.ButtonGroupViewFactory.create(this.config.buttonGroups.advanced);
  }
  handleCommandButton(latex) {
    boundMethodCheck(this, ref);
    this.performCommand(latex);
    return this.focus();
  }
  handleWriteButton(latex) {
    boundMethodCheck(this, ref);
    this.performWrite(latex);
    return this.focus();
  }
  performCommand(latex) {
    return this.input().mathquill('cmd', latex);
  }
  performWrite(latex) {
    return this.input().mathquill('write', latex);
  }
  focus() {
    boundMethodCheck(this, ref);
    return this.$('textarea').focus();
  }
  equationLatex() {
    return this.input().mathquill('latex');
  }
};