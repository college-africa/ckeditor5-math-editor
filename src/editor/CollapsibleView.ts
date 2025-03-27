import { View } from './View'; // Assuming previous View implementation

export class CollapsibleView extends View {
  constructor(options?: any) {
    super(options);

    // Bind method to maintain correct context
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  protected initialize() {
    this.$('.collapsible-box-toggle').on(
      'click',
      this.toggleCollapse.bind(this)
    );
  }

  private toggleCollapse(e: Event): void {
    e.preventDefault();

    const $content = this.$('.box-content-collapsible');

    if ($content.is(':visible')) {
      this.closeCollapsible();
    } else {
      this.openCollapsible();
    }
  }

  private openCollapsible(): void {
    this.$('.box-content-collapsible').slideDown();
    this.toggleOpenClass();
  }

  private closeCollapsible(): void {
    this.$('.box-content-collapsible').slideUp();
    this.toggleOpenClass();
  }

  private toggleOpenClass(): void {
    this.$('.collapsible-box-toggle').toggleClass(
      'collapsible-box-toggle-open'
    );
  }
}

export default CollapsibleView;
