import { NgFor, NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  CdkDrag,
  CdkDragMove,
  CdkDragPlaceholder,
  CdkDragRelease,
  CdkDropList,
} from '@angular/cdk/drag-drop';

import { FormlyFieldConfig } from '@ngx-formly/core';
import { DragDropService } from '@app/shared/drag-drop.service';

@Component({
  selector: 'all-controls',
  templateUrl: './all-controls.component.html',
  standalone: true,
  imports: [NgFor, NgForOf, CdkDrag, CdkDropList, CdkDragPlaceholder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'flex flex-grow w-full' },
})
export class AllControlsComponent implements OnInit {
  readonly #dragDropService = inject(DragDropService);

  public get conectedList() {
    return this.#dragDropService.dropLists;
  }

  readonly basicFieldConfigs: FormlyFieldConfig[] = [
    {
      key: 'Input',
      type: 'input',
      props: {
        label: 'Input',
        placeholder: 'Placeholder',
        description: 'Description',
      },
    },

    {
      key: 'Textarea',
      type: 'textarea',
      props: {
        label: 'Textarea',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      },
    },

    {
      key: 'Checkbox',
      type: 'checkbox',
      props: {
        label: 'Accept terms',
      },
    },

    {
      key: 'Select',
      type: 'select',
      props: {
        label: 'Select',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
        options: [
          { value: 1, label: 'Option 1' },
          { value: 2, label: 'Option 2' },
          { value: 3, label: 'Option 3' },
          { value: 4, label: 'Option 4', disabled: true },
        ],
      },
    },
  ];

  constructor() {}

  ngOnInit() {}

  noReturnPredicate() {
    return false;
  }
}
