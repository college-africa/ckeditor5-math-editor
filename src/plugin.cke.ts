import { Plugin, ButtonView, View, Dialog, Locale } from 'ckeditor5';

export default class MathEditor extends Plugin {
  get requires() {
    return [Dialog];
  }

  init(): void {
    const editor = this.editor;

    // Add the math editor button to the toolbar
    editor.ui.componentFactory.add('mathEditor', (locale) => {
      const button = new ButtonView(locale);

      button.set({
        label: 'Math Editor',
        icon,
        tooltip: true,
      });

      button.on('execute', () => {
        this.openMathEditor(button, locale);
      });

      return button;
    });
  }

  openMathEditor(button: ButtonView, locale: Locale): void {
    const dialog = this.editor.plugins.get('Dialog');

    const existingLatex = this.editor.model.document.selection
      .getFirstRange()
      ?.getItems()
      .next().value?.data;

    // If the button is turned on, hide the modal.
    if (button.isOn) {
      dialog.hide();
      button.isOn = false;

      return;
    }

    button.isOn = true;

    // Otherwise, show the modal.
    // First, create a view with some simple content. It will be displayed as the dialog's body.
    const iframeView = new View(locale);

    iframeView.setTemplate({
      tag: 'iframe',
      attributes: {
        id: 'mathEditorIframe',
        style: {
          // margin: 'var(--ck-spacing-large)',
          width: '800px',
          height: '320px',
        },
        tabindex: -1,
        src: 'editor.html',
        frameborder: '0',
      },
    });

    // Tell the plugin to display a modal with the title, content, and one action button.
    dialog.show({
      id: 'mathEditorDialog',
      isModal: true,
      title: 'Math Editor',
      content: iframeView,
      actionButtons: [
        {
          label: 'close',
          withText: true,
          onExecute: () => dialog.hide(),
        },
        {
          label: 'insert',
          class: 'ck-button-action',
          withText: true,
          onExecute: () => {
            this.insertMath(iframeView);
            dialog.hide();
          },
        },
      ],
      onHide() {
        button.isOn = false;
      },
    });

    // Pass the selected text to the iframe (if needed)
    setTimeout(() => {
      const iframe = iframeView.element as HTMLIFrameElement;
      iframe.contentWindow?.postMessage({ existingLatex }, '*');
    }, 100);
  }

  insertMath(iframeView: View): void {
    const iframe = iframeView.element as HTMLIFrameElement;
    const iframeWindow = iframe.contentWindow;

    const latex = iframeWindow?.getLatex();

    if (!latex) return;

    // Convert LaTeX to a mathematical element
    const mathElement = `\\(${latex}\\)`;

    // Get the current editor
    const editor = this.editor;

    // Execute a command to insert the math element
    editor.model.change((writer) => {
      // Create a math element
      const mathNode = writer.createElement('mathInline', {
        latex: mathElement,
      });

      // Insert the math element at the current selection
      editor.model.insertContent(mathNode);
    });
  }
}

const icon = `<svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="#494c4e" d="M14 16.5c0 .83-.67 1.5-1.5 1.5h-7c-.83 0-1.5-.67-1.5-1.5 0-.293.095-.566.25-.814.443-.707.855-1.433 1.272-2.157l1.38-2.405c.364-.636.73-1.27 1.088-1.91.02-.038.256-.385.23-.425l-.443-.72-1.045-1.697-1.22-1.986-.84-1.36c-.246-.4-.578-.815-.65-1.292-.05-.338.01-.695.185-.992C4.49.258 5.02-.003 5.572 0H13c.55 0 1 .45 1 1s-.45 1-1 1H7.57l.59.983c.415.693.83 1.387 1.247 2.08l1.13 1.887c.197.33.472.673.454 1.074-.01.27-.13.517-.273.74-.35.55-.672 1.12-1.004 1.68L8.275 12.87l-1.092 1.84c-.016.025-.142.29-.173.29h5.49c.83 0 1.5.67 1.5 1.5z"></path> </g></svg>`;
