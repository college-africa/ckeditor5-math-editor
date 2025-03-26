import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { createElement } from '@ckeditor/ckeditor5-utils/src/dom';

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
    const editor = this.editor;

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
