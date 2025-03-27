import ButtonGroupViewFactory from './ButtonGroupViewFactory';
import ButtonViewFactory from './ButtonViewFactory';
import { ButtonOptions } from './ButtonViews';
import config from './config.json';
import { events } from './events';
import { View } from './View'; // Assuming the previous View class

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
  // Define button configuration structure
  label: string;
  latex: string;
}

interface ButtonGroupConfig {
  // Define button group configuration structure
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

  constructor(options: MathEditorOptions = {}) {
    super(options);

    this.existingLatex = options.existingLatex;
    this.restrictions = options.restrictions || {};

    // Bind methods to maintain correct `this` context
    // this.handleCommandButton = this.handleCommandButton.bind(this);
    // this.handleWriteButton = this.handleWriteButton.bind(this);
    this.focus = this.focus.bind(this);
  }

  protected initialize(): void {
    // Assuming a global event system or using a pub/sub pattern
    events.on('latex:command', this.handleCommandButton, this);
    events.on('latex:write', this.handleWriteButton, this);
  }

  render(): this {
    this.addButtonBar();
    this.addButtonGroups();
    this.enableMathMagic();
    return this;
  }

  private enableMathMagic(): void {
    this.$('.math-button a').mathquill();
    this.input().mathquill('editable');

    if (this.existingLatex != null) {
      this.input().mathquill('latex', this.existingLatex);
    }

    this.focus();
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
    this.input().mathquill('cmd', latex);
  }

  private performWrite(latex: string): void {
    this.input().mathquill('write', latex);
  }

  private focus(): void {
    this.$('textarea').focus();
  }

  public equationLatex(): string {
    return this.input().mathquill('latex');
  }
}

export default MathEditorView;
