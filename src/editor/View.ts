interface ViewOptions {
  $el?: JQuery;
  el?: HTMLElement | string;
  [key: string]: any;
}

export class View {
  protected options: ViewOptions;
  public $el: JQuery;

  constructor(options: ViewOptions = {}) {
    this.options = options;
    this.$el = options.$el || $(options.el || '');
    this.initialize();
  }

  // jQuery selector method
  $(selector: string): JQuery {
    return this.$el.find(selector);
  }

  // Initialization method, can be overridden by subclasses
  protected initialize(): void {}

  // Create element from template
  protected createElement(): JQuery {
    return (this.$el = $(this.template()));
  }

  // Template method to be implemented by subclasses
  protected template(): string {
    return '';
  }
}
