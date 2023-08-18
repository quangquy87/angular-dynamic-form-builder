import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Type,
  ViewChild,
  inject,
} from '@angular/core';
import {
  FormlyFieldConfig,
  FormlyFieldProps as CoreFormlyFieldProps,
  FormlyModule,
  FieldType,
  FieldTypeConfig,
} from '@ngx-formly/core';
import { nanoid } from 'nanoid/non-secure';

import {
  CdkDragDrop,
  CdkDropList,
  DropListOrientation,
} from '@angular/cdk/drag-drop';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { TypeOption } from '@ngx-formly/core/lib/models';
import { DragDropService } from '@app/shared/drag-drop.service';



export interface FormlyDroplistProps extends CoreFormlyFieldProps {
  orientation: DropListOrientation;
  dropped?: (
    event: CdkDragDrop<FormlyFieldConfig[]>,
    field: FormlyFieldConfig
  ) => void;
}

export interface FormlyDroplistFieldConfig
  extends FormlyFieldConfig<FormlyDroplistProps> {
  type: 'droplist' | Type<FormlyFieldDroplist>;
}

@Component({
  selector: 'formly-field-droplist',
  template: `
    <div
      [id]="id"
      cdkDropList
      [cdkDropListOrientation]="props.orientation"
      [cdkDropListData]="field.fieldGroup!"
      [cdkDropListConnectedTo]="conectedList"
      (cdkDropListDropped)="drop($event)"
      class="grid grid-cols-3 gap-4 w-full"
    >
      <ng-container *ngIf="field.fieldGroup!.length > 0; else emptyTmp">
        <ng-container *ngFor="let field of field.fieldGroup!; let i = index">
          <formly-field class="flex flex-grow" [field]="field"></formly-field>
        </ng-container>
      </ng-container>

      <ng-template #emptyTmp>
        <div class="flex col-span-3 justify-center items-center h-10 inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]">
          <div>Drop item here</div>
        </div>
    </ng-template>
    </div>
  `,
   changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkDropList, FormlyModule, NgFor, NgForOf, NgIf],
  host: { class: 'flex w-full' },
})
export class FormlyFieldDroplist
  extends FieldType<FieldTypeConfig<FormlyDroplistProps>>
  implements AfterViewInit
{
  readonly #dragDropService = inject(DragDropService);

  @ViewChild(CdkDropList) dropList?: CdkDropList;

  static typeName = 'droplist';
  static register(wrappers: string[] = []): TypeOption[] {
    return [
      {
        name: FormlyFieldDroplist.typeName,
        component: FormlyFieldDroplist,
        wrappers: wrappers,
      },
    ];
  }

  static fieldConfig = (
    config: Partial<FormlyDroplistFieldConfig>
  ): FormlyDroplistFieldConfig => {
    return {
      id: nanoid(),
      type: 'droplist',
      ...config,
      key: config.key ?? FormlyFieldDroplist.typeName,
      fieldGroup: [],
      props: config.props ?? {
        orientation: 'horizontal',
      },
    };
  };

  // readonly conectedList = this.#dragDropService.dropListSignal;
  public get conectedList() {
    return this.#dragDropService.dropLists;
  }

  ngAfterViewInit(): void {
    console.log('droplist ngAfterViewIni---------------t');
    if (this.dropList) {
      console.log('droplist ');
      this.#dragDropService.register(this.dropList);
    }
  }

  drop(event: CdkDragDrop<FormlyFieldConfig[]>) {
    if (this.props.dropped) this.props.dropped(event, this.field);
  }
}
