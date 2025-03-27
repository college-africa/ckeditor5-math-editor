import { events } from './events';
import { View } from './View'; // Assuming previous View implementation

export interface ButtonOptions {
  klass: 'CommandButtonView' | 'WriteButtonView';
  latex: string;
  buttonText?: string;
  className?: string;
}

abstract class BaseButtonView extends View {
  protected latex: string;
  protected buttonText: string;
  protected className: string;
  protected abstract event: 'command' | 'write';

  constructor(options: ButtonOptions) {
    super(options);

    this.latex = this.options.latex;
    this.buttonText = this.options.buttonText || this.options.latex;
    this.className = ['math-button', this.options.className].join(' ').trim();

    // Bind method to maintain correct context
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick(e: Event): void {
    e.preventDefault();
    events.trigger(`latex:${this.event}`, this.latex);
  }

  render(): this {
    this.createElement();
    this.$('a').on('click', this.handleClick);
    return this;
  }

  protected template(): string {
    return `<div class="${this.className}">
  <a title="${this.buttonText}" href="#">${this.buttonText}</a>
</div>`;
  }
}

// Command Button View
class CommandButtonView extends BaseButtonView {
  protected event = 'command' as const;
}

// Write Button View
class WriteButtonView extends BaseButtonView {
  protected event = 'write' as const;
}

// // Attach to global namespace for backwards compatibility
// namespace MathEditor {
//   export namespace Buttons {
//     export const BaseButtonView = BaseButtonView;
//     export const CommandButtonView = CommandButtonView;
//     export const WriteButtonView = WriteButtonView;
//   }
// }

// (window as any).MathEditor = MathEditor;

export { BaseButtonView, CommandButtonView, WriteButtonView };
