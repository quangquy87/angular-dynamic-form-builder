import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  signal,
} from '@angular/core';

import {
  FormlyFieldConfig,
  FormlyFieldProps,
  FormlyModule,FieldWrapper,
  FieldType,
  FieldTypeConfig,
} from '@ngx-formly/core';

import {
  CdkDrag,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDragPreview,
} from '@angular/cdk/drag-drop';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgClass } from '@angular/common';
import { WrapperOption } from '@ngx-formly/core/lib/models';

interface FormlyDragWrapperProps extends FormlyFieldProps {
 
}

@Component({
  selector: 'drag-wrapper',
  template: `
    <div cdkDrag class="flex flex-grow group cursor-move py-2 px-2  border border-transparent border-dashed hover:border-primary focus-within:border-primary">
      <ng-container #fieldComponent></ng-container>


      <div
        *cdkDragPlaceholder
        class="flex my-3 text-center w-full drag-placeholder before:relative before:top-[50%] before:w-[50%] before:border-t-4 before:border-t-primary before:translate-y-[50%] after:relative after:top-[50%] after:w-[50%] after:border-t-4 after:border-t-primary after:translate-y-[50%]"
      >
        <span class="bg-primary rounded px-2 whitespace-nowrap"
          >Drag it here</span
        >
      </div>

     
      <div
        *cdkDragPreview
        class="flex items-center justify-center py-1 px-2 bg-indigo-100 dark:bg-[#404249] w-28 border border-dashed border-indigo-100 dark:border-[#404249] text-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-400/10 hover:cursor-move hover:border-primary dark:hover:border-primary"
      >
        <span>{{ field.name }}</span>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NzButtonModule,
    NzIconModule,
    CdkDrag,
    CdkDragHandle,
    CdkDragPreview,
    CdkDragPlaceholder,
    NgClass,
  ],
  
})
export class FormlyDragWrapper extends FieldWrapper<
  FormlyFieldConfig<FormlyDragWrapperProps>
> {
 

  static wrapperName = 'drag-wrapper';
  static register(): WrapperOption[] {
    return [
      {
        name: FormlyDragWrapper.wrapperName,
        component: FormlyDragWrapper,
      },
    ];
  }

 
}
