import { View } from './View'; // Assuming previous View implementation

export class CollapsibleView extends View {
  constructor(options?: any) {
    super(options);

    // Bind method to maintain correct context
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  protected initialize(): void {
    this.$('.collapsible-box-toggle').on('click', this.toggleCollapse);
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

// // Attach to global namespace for backwards compatibility
// namespace MathEditor {
//   export const CollapsibleView = CollapsibleView;
// }

// (window as any).MathEditor = MathEditor;

export default CollapsibleView;
