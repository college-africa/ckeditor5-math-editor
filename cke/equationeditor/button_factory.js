export default class ButtonFactory {
  static createButton(config) {
    const button = document.createElement('button');
    button.className = `math-button ${config.className || ''}`;
    button.innerHTML = config.buttonText || config.latex;
    button.dataset.latex = config.latex;

    button.addEventListener('click', () => {
      const event = new CustomEvent('latex:insert', { detail: config.latex });
      document.dispatchEvent(event);
    });

    return button;
  }

  static createButtonGroup(groupConfig) {
    const group = document.createElement('div');
    group.className = 'button-group';

    const header = document.createElement('header');
    header.textContent = groupConfig.groupName;
    group.appendChild(header);

    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';

    groupConfig.buttonViews.forEach((buttonConfig) => {
      const button = ButtonFactory.createButton(buttonConfig);
      buttonsContainer.appendChild(button);
    });

    group.appendChild(buttonsContainer);
    return group;
  }
}
