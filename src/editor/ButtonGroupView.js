"use strict";

var ref,
  boundMethodCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new Error('Bound instance method accessed before binding');
    }
  };
ref = EquationEditor.ButtonGroupView = class ButtonGroupView extends EquationEditor.View {
  constructor() {
    super(...arguments);
    this.toggle = this.toggle.bind(this);
  }
  initialize() {
    this.groupName = this.options.groupName;
    return this.buttonViews = this.options.buttonViews;
  }
  render() {
    this.createElement();
    this.renderButtons();
    new EquationEditor.CollapsibleView({
      $el: this.$el
    });
    this.$('header').click(this.toggle);
    return this;
  }
  toggle() {
    boundMethodCheck(this, ref);
    return this.$('.collapsible-box-toggle').click();
  }
  renderButtons() {
    var buttonView, i, len, ref1, results;
    ref1 = this.buttonViews;
    results = [];
    for (i = 0, len = ref1.length; i < len; i++) {
      buttonView = ref1[i];
      results.push(this.$('.buttons').append(buttonView.render().$el));
    }
    return results;
  }
  template() {
    return `<div class="button-group collapsible">
  <a href='#' class='collapsible-box-toggle ss-dropdown'></a> <header>${this.groupName}</header>

  <div class="buttons box-content-collapsible hidden"></div>
</div>`;
  }
};