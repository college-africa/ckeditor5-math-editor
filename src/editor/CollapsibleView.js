"use strict";

var ref,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
ref = EquationEditor.CollapsibleView = class CollapsibleView extends EquationEditor.View {
  constructor() {
    super(...arguments);
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
  initialize() {
    return this.$('.collapsible-box-toggle').on('click', this.toggleCollapse);
  }
  toggleCollapse(e) {
    boundMethodCheck(this, ref);
    e.preventDefault();
    if (this.$('.box-content-collapsible').is(':visible')) {
      return this.closeCollapsible();
    } else {
      return this.openCollapsible();
    }
  }
  openCollapsible() {
    this.$('.box-content-collapsible').slideDown();
    return this.toggleOpenClass();
  }
  closeCollapsible() {
    this.$('.box-content-collapsible').slideUp();
    return this.toggleOpenClass();
  }
  toggleOpenClass() {
    return this.$('.collapsible-box-toggle').toggleClass('collapsible-box-toggle-open');
  }
};