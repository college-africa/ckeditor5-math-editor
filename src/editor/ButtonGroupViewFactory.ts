import ButtonGroupView from './ButtonGroupView';
import ButtonViewFactory from './ButtonViewFactory';

interface ButtonGroupConfig {
  buttonViews: any[];
  groupName: string;
  [key: string]: any;
}

class ButtonGroupViewFactory {
  static create(config: ButtonGroupConfig[]) {
    return config.map((buttonGroupConfig) => {
      // Create button views using the ButtonViewFactory
      buttonGroupConfig.buttonViews = ButtonViewFactory.create(
        buttonGroupConfig.buttonViews
      );

      // Create and return a new ButtonGroupView instance
      return new ButtonGroupView(buttonGroupConfig);
    });
  }
}

// // Attach to global namespace
// namespace MathEditor {
//   export const ButtonGroupViewFactory = ButtonGroupViewFactory;
// }

// (window as any).MathEditor = MathEditor;

export default ButtonGroupViewFactory;
