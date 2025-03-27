'use strict';

import {
  ButtonOptions,
  CommandButtonView,
  WriteButtonView,
} from './ButtonViews';

const buttonClasses = {
  CommandButtonView,
  WriteButtonView,
};

class ButtonViewFactory {
  static create(config: ButtonOptions[]) {
    return config.map((buttonConfig) => {
      const ButtonClass = buttonClasses[buttonConfig.klass];
      return new ButtonClass(buttonConfig);
    });
  }
}

// Attach to global namespace
// namespace MathEditor {
//   export const ButtonViewFactory = ButtonViewFactory;
// }

// (window as any).MathEditor = MathEditor;

export default ButtonViewFactory;
