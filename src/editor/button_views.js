"use strict";

var ref,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
EquationEditor.Buttons = {};
ref = EquationEditor.Buttons.BaseButtonView = class BaseButtonView extends EquationEditor.View {
  constructor() {
    super(...arguments);
    this.handleClick = this.handleClick.bind(this);
  }
  initialize() {
    this.latex = this.options.latex;
    this.buttonText = this.options.buttonText || this.options.latex;
    return this.className = ['math-button', this.options.className].join(' ').trim();
  }
  handleClick(e) {
    boundMethodCheck(this, ref);
    e.preventDefault();
    return EquationEditor.Events.trigger(`latex:${this.event}`, this.latex);
  }
  render() {
    this.createElement();
    this.$('a').on('click', this.handleClick);
    return this;
  }
  template() {
    return `<div class="${this.className}">
  <a title="${this.buttonText}" href="#">${this.buttonText}</a>
</div>`;
  }
};
EquationEditor.Buttons.CommandButtonView = function () {
  class CommandButtonView extends EquationEditor.Buttons.BaseButtonView {}
  ;
  CommandButtonView.prototype.event = 'command';
  return CommandButtonView;
}.call(void 0);
EquationEditor.Buttons.WriteButtonView = function () {
  class WriteButtonView extends EquationEditor.Buttons.BaseButtonView {}
  ;
  WriteButtonView.prototype.event = 'write';
  return WriteButtonView;
}.call(void 0);