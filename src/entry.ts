// Initialize the equation editor
const params = new URLSearchParams(window.location.search);
const existingLatex = params.get('existingLatex') || '';

const equationEditor = new MathEditorView({
  $el: $('.equation-editor'),
  existingLatex: existingLatex,
  restrictions: {},
}).render();

// Pass the LaTeX back to CKEditor5 when done
window.onclose = () => {
  const latex = equationEditor.input().mathquill('latex');
  window.parent.postMessage({ latex }, '*');
};
