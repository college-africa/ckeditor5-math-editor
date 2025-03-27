import CollapsibleView from './CollapsibleView';
import { View } from './View'; // Assuming previous View implementation

interface ButtonGroupViewOptions {
  groupName: string;
  buttonViews: any[];
  $el?: JQuery;
}

export class ButtonGroupView extends View {
  private readonly groupName: string;
  private readonly buttonViews: any[];

  constructor(options: ButtonGroupViewOptions) {
    super(options);

    this.groupName = options.groupName;
    this.buttonViews = options.buttonViews;
    // Bind method to maintain correct context
    this.toggle = this.toggle.bind(this);
  }

  render(): this {
    this.createElement();
    this.renderButtons();

    // Create collapsible view
    new CollapsibleView({ $el: this.$el });

    // Attach toggle event
    this.$('header').click(this.toggle);

    return this;
  }

  private toggle(): void {
    // Simulate clicking the collapsible toggle
    this.$('.collapsible-box-toggle').click();
  }

  private renderButtons(): void {
    this.buttonViews.forEach((buttonView) =>
      this.$('.buttons').append(buttonView.render().$el)
    );
  }

  protected template(): string {
    return `
      <div class="button-group collapsible">
        <a href='#' class='collapsible-box-toggle ss-dropdown'></a> <header>${this.groupName}</header>
        <div class="buttons box-content-collapsible hidden"></div>
      </div>`;
  }
}

// // Attach to global namespace for backwards compatibility
// namespace MathEditor {
//   export const ButtonGroupView = ButtonGroupView;
// }

// (window as any).MathEditor = MathEditor;

export default ButtonGroupView;
