import {
  CdkDrag,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DragDropService {
  readonly #document = inject(DOCUMENT);

  dropLists: CdkDropList[] = [];

  readonly $dropList = signal<CdkDropList[]>([]);
  readonly dropList = this.$dropList.asReadonly();

  currentHoverDropListId?: string;

  public register(dropList: CdkDropList) {
    this.$dropList.mutate((s) => s.push(dropList));
  }

  dragMoved(event: CdkDragMove<FormlyFieldConfig>) {
    let elementFromPoint = this.#document.elementFromPoint(
      event.pointerPosition.x,
      event.pointerPosition.y
    );

    if (!elementFromPoint) {
      this.currentHoverDropListId = undefined;
      return;
    }

    if (elementFromPoint.classList.contains('no-drop')) {
      this.currentHoverDropListId = 'no-drop';
      return;
    }

    let dropList = elementFromPoint.classList.contains('cdk-drop-list')
      ? elementFromPoint
      : elementFromPoint.closest('.cdk-drop-list');

    if (!dropList) {
      this.currentHoverDropListId = undefined;
      return;
    }

    this.currentHoverDropListId = dropList.id;
  }

  isDropAllowed(drag: CdkDrag, drop: CdkDropList) {
    if (this.currentHoverDropListId == null) {
      return true;
    }

    return drop.id === this.currentHoverDropListId;
  }

  // drop(event: CdkDragDrop<FormlyFieldConfig[]>) {
  //   console.log('Dropped', event, event.item.data, event.previousContainer.id);

  //   if (event.previousContainer.id !== 'toolbox') {
  //     if (event.previousContainer == event.container) {
  //       moveItemInArray(
  //         event.container.data,
  //         event.previousIndex,
  //         event.currentIndex,
  //       );
  //     } else {
  //       transferArrayItem(
  //         event.previousContainer.data,
  //         event.container.data,
  //         event.previousIndex,
  //         event.currentIndex,
  //       );
  //     }

  //     this.controlDropped.next(event.item.data);
  //   } else {
  //     let sourceItem = event.item.data as FormlyFieldConfig;
  //     let control = this.formControlsService.createControl(sourceItem.type);

  //     event.container.data.splice(event.currentIndex, 0, control);

  //     this.controlDropped.next(control);
  //   }
  // }

  dragReleased(event: CdkDragRelease) {
    this.currentHoverDropListId = undefined;
  }
}
