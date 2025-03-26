import { Plugin, ButtonView, createElement } from 'ckeditor5';

export default class EquationEditorPlugin extends Plugin {
  init() {
    const editor = this.editor;

    // Add the equation editor button to the toolbar
    editor.ui.componentFactory.add('equationEditor', (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Equation Editor',
        icon: '<svg>...</svg>', // Add an appropriate SVG icon here
        tooltip: true,
      });

      button.on('execute', () => {
        this.openEquationEditor();
      });

      return button;
    });
  }

  openEquationEditor() {
    // Create a modal dialog for the equation editor
    const modal = createElement(document, 'div', {
      class: 'cke-equation-editor-modal',
    });

    modal.innerHTML = `
			<iframe src="/cke/equationeditor/equation_editor.html" frameborder="0"></iframe>
		`;

    document.body.appendChild(modal);

    // Close the modal when done
    modal.querySelector('iframe').contentWindow.onclose = () => {
      document.body.removeChild(modal);
    };
  }
}
