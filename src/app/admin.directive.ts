import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[admin]' })
export class AdminDirective {

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef)
  { }

  @Input() set admin(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
