import ButtonGroupViewFactory from './ButtonGroupViewFactory';
import ButtonViewFactory from './ButtonViewFactory';
import { ButtonOptions } from './ButtonViews';
import config from './config.json';
import { events } from './events';
import { View } from './View';

// Interfaces for type safety
interface MathEditorOptions {
  existingLatex?: string;
  restrictions?: {
    disallow_intermediate?: boolean;
    disallow_advanced?: boolean;
  };
  $el?: JQuery;
  el?: HTMLElement | string;
}

interface ButtonConfig {
  label: string;
  latex: string;
}

interface ButtonGroupConfig {
  name: string;
  buttons: ButtonConfig[];
}

interface EditorConfig {
  buttonBar: ButtonConfig[];
  buttonGroups: {
    basic: ButtonGroupConfig[];
    intermediate: ButtonGroupConfig[];
    advanced: ButtonGroupConfig[];
  };
}

export class MathEditorView extends View {
  private readonly existingLatex?: string;
  private readonly restrictions: NonNullable<MathEditorOptions['restrictions']>;
  private mathquillInstance: any;

  constructor(options: MathEditorOptions = {}) {
    super(options);

    this.existingLatex = options.existingLatex;
    this.restrictions = options.restrictions || {};

    // Bind methods to maintain correct `this` context
    this.focus = this.focus.bind(this);
  }

  protected initialize(): void {
    events.on('latex:command', this.handleCommandButton, this);
    events.on('latex:write', this.handleWriteButton, this);
  }

  private initializeMathquill(): void {
    // Use the latest Mathquill initialization
    const MQ = window.MathQuill.getInterface(2);
    const input = this.$('.math')[0];

    this.mathquillInstance = MQ.MathField(input, {
      spaceBehavesLikeTab: true,
      handlers: {
        // Optional: add custom event handlers
        enter: () => {
          // Handle enter key if needed
        },
      },
    });

    // Set existing latex if provided
    if (this.existingLatex) {
      this.setExistingLatex(this.existingLatex);
    }
  }

  render(): this {
    this.addButtonBar();
    this.addButtonGroups();
    return this;
  }

  public input(): JQuery {
    return this.$('.math');
  }

  private addButtonBar(): void {
    const buttons = this.buttonBarButtons();
    buttons.forEach((button) =>
      this.$('.button-bar').append(button.render().$el)
    );
  }

  private addButtonGroups(): void {
    const buttonGroups = this.buttonGroups();
    buttonGroups.forEach((buttonGroup) =>
      this.$('.button-groups').append(buttonGroup.render().$el)
    );
  }

  private buttonBarButtons() {
    return ButtonViewFactory.create(config.buttonBar as ButtonOptions[]);
  }

  private buttonGroups() {
    let groups = this.basicButtonGroups();

    if (!this.restrictions.disallow_intermediate) {
      groups = groups.concat(this.intermediateButtonGroups());
    }

    if (!this.restrictions.disallow_advanced) {
      groups = groups.concat(this.advancedButtonGroups());
    }

    return groups;
  }

  private basicButtonGroups() {
    return ButtonGroupViewFactory.create(config.buttonGroups.basic);
  }

  private intermediateButtonGroups() {
    return ButtonGroupViewFactory.create(config.buttonGroups.intermediate);
  }

  private advancedButtonGroups() {
    return ButtonGroupViewFactory.create(config.buttonGroups.advanced);
  }

  private handleCommandButton(latex: string): void {
    this.performCommand(latex);
    this.focus();
  }

  private handleWriteButton(latex: string): void {
    this.performWrite(latex);
    this.focus();
  }

  private performCommand(latex: string): void {
    if (this.mathquillInstance) {
      this.mathquillInstance.cmd(latex);
    }
  }

  private performWrite(latex: string): void {
    if (this.mathquillInstance) {
      this.mathquillInstance.write(latex);
    }
  }

  private focus(): void {
    if (this.mathquillInstance) {
      this.mathquillInstance.focus();
    }
  }

  public getLatex(): string {
    return this.mathquillInstance ? this.mathquillInstance.latex() : '';
  }

  public setExistingLatex(latex?: string) {
    if (!latex || !this.mathquillInstance) return;

    this.mathquillInstance.latex(latex);
    this.focus();
  }
}

export default MathEditorView;
