import MathEditorView from './editor/MathEditorView';

// Initialize the equation editor
const params = new URLSearchParams(window.location.search);
const existingLatex = params.get('existingLatex') ?? '';

const mathEditor = new MathEditorView({
  $el: $('.equation-editor'),
  existingLatex,
  restrictions: {},
}).render();

window.getLatex = mathEditor.getLatex.bind(mathEditor);

window.addEventListener('message', (event) => {
  const { existingLatex } = event.data;
  if (existingLatex) {
    mathEditor.setExistingLatex(existingLatex);
  }
});
