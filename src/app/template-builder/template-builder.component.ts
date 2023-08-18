import {
  afterNextRender,
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { AllControlsComponent } from './components/all-controls/all-controls.component';
import { FormlyBuilderModule } from '@app/controls/formly-builder/formly-builder.module';
import { DragDropService } from '@app/shared/drag-drop.service';

@Component({
  selector: 'template-builder',
  templateUrl: './template-builder.component.html',
  standalone: true,
  imports: [FormlyBuilderModule, AllControlsComponent],
})
export class TemplateBuilderComponent implements OnInit, AfterViewInit {
  readonly #dragDropService = inject(DragDropService);

  @ViewChild(CdkDropList) dropList?: CdkDropList;

  public get conectedList() {
    return this.#dragDropService.dropLists;
  }

  form = new FormGroup({});
  model = {};

  fields: FormlyFieldConfig[] = [];

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.dropList) {
      this.#dragDropService.register(this.dropList);
    }
  }

  drop(event: CdkDragDrop<FormlyFieldConfig[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
