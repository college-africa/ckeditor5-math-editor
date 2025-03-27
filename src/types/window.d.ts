interface Window {
  getLatex: () => string;
  MathQuill: {
    getInterface: (version: number) => any;
  };
}
