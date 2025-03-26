import ButtonFactory from './button_factory.js';

export default class EquationEditorView {
  constructor({ container, config }) {
    this.container = container;
    this.config = config;
  }

  render() {
    this.addButtonBar();
    this.addButtonGroups();
    this.enableMathInput();
  }

  addButtonBar() {
    const buttonBar = this.container.querySelector('.button-bar');
    this.config.buttonBar.forEach((buttonConfig) => {
      const button = ButtonFactory.createButton(buttonConfig);
      buttonBar.appendChild(button);
    });
  }

  addButtonGroups() {
    const buttonGroupsContainer =
      this.container.querySelector('.button-groups');
    Object.values(this.config.buttonGroups).forEach((groupConfigs) => {
      groupConfigs.forEach((groupConfig) => {
        const group = ButtonFactory.createButtonGroup(groupConfig);
        buttonGroupsContainer.appendChild(group);
      });
    });
  }

  enableMathInput() {
    const mathInput = this.container.querySelector('.math');
    $(mathInput).mathquill('editable');
  }
}
