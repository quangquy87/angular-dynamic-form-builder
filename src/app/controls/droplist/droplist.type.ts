import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
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
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { TypeOption } from '@ngx-formly/core/lib/models';
import { TemplateBuilderService } from '@app/shared/template-builder.service';



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
      [cdkDropListConnectedTo]="conectedList()"
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
  implements AfterViewInit,OnDestroy
{
  readonly #templateBuilderService = inject(TemplateBuilderService);

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

   readonly conectedList = this.#templateBuilderService.dropList;


  ngAfterViewInit(): void {
  
    if (this.dropList) {
      console.log("dropList",this.dropList)
      this.#templateBuilderService.registerCdkDropList(this.dropList);
    }
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy")
   // this.#templateBuilderService.removeCdkDropList(this.id); 
  }

  drop(event: CdkDragDrop<FormlyFieldConfig[]>) {
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const field = event.item.data as FormlyFieldConfig;
      this.#templateBuilderService.addFieldConfigToDropList(this.id, event.currentIndex, field);
    }
  }
}
