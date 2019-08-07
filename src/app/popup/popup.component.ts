import { Component, OnInit, TemplateRef } from '@angular/core';
import { PopupRef, PopupContent, PopupContentRenderMethod } from './popup.definitions';

@Component({
  templateUrl: './popup.component.html'
})
export class PopupComponent implements OnInit {
  PopupContentRenderMethod = PopupContentRenderMethod;

  renderMethod: PopupContentRenderMethod = PopupContentRenderMethod.Component;
  content: PopupContent;
  context;

  constructor(private popupRef: PopupRef) {
  }

  ngOnInit() {
    this.content = this.popupRef.content;

    if (typeof this.content === 'string') {
      this.renderMethod = PopupContentRenderMethod.Text;
    } else if (this.content instanceof TemplateRef) {
      this.renderMethod = PopupContentRenderMethod.Template;

      // We provide the close function for any template, in order to be able to close the Popup
      this.context = {
        close: this.popupRef.close.bind(this.popupRef)
      };
    }
  }
}

/**                               HOW TO USE?
 3 ways:

  - Component: is the default mode. See how is used in some place.
  - Text: You can render a simple text like this way:
       // constructor(service: PopupService){}

       // open function
         show(content: string, origin: HTMLElement) {
            const ref = this.service.open<{ skills: number[] }>({
              content,
              origin,
              width: '200px',
              data: {
                skills: [1, 2, 3]
              }
            });

            ref.afterClosed$.subscribe(res => ...);
          }

  - Template:
      // HTML
         <a class="button is-primary" (click)="show(tpl, origin)" #origin>Popover</a>

         <ng-template #tpl let-close="close">
         And here's some amazing content. It's very engaging. Right?
         <div style="display: flex; justify-content: flex-end; margin-top: 10px;">
         <a class="button is-danger is-small" (click)="close({id: 2})">Close</a>
         </div>
         </ng-template>

      // constructor(service: PopupService){}

      // open function:
         show(content: TemplateRef<any>, origin: HTMLElement) {
            const ref = this.service.open<{ skills: number[] }>({
              content,
              origin,
              width: '200px',
              data: {
                skills: [1, 2, 3]
              }
            });

            ref.afterClosed$.subscribe(res => ...);
          }
 */
