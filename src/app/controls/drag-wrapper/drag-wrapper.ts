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
    <div cdkDrag class="flex flex-grow group py-2 px-2 relative border border-transparent border-dashed hover:border-primary focus-within:border-primary">
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
        cdkDragHandle
        class="flex items-center justify-center cursor-grab bg-primary text-white z-10 absolute top-[50%] h-[30px] w-[30px] -right-[17px] -mt-[15px] leading-[31px] rounded-full text-[16px] invisible group-hover:visible"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="arrows-up-down-left-right"
          class="h-4 -align-[0.125em]"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M512 255.1c0 6.755-2.844 13.09-7.844 17.62l-88 80.05C411.5 357.8 405.8 359.9 400 359.9c-13.27 0-24-10.76-24-24c0-6.534 2.647-13.04 7.844-17.78l42.07-38.28H280v146l38.25-42.1c4.715-5.2 11.21-7.849 17.74-7.849c13.23 0 24.01 10.71 24.01 24.03c0 5.765-2.061 11.55-6.25 16.15l-80 88.06C269.2 509.2 262.8 512 256 512s-13.22-2.846-17.75-7.849l-80-88.06c-4.189-4.603-6.25-10.39-6.25-16.15c0-13.38 10.83-24.03 23.1-24.03c6.526 0 13.02 2.649 17.75 7.849L232 425.9V279.8H86.09l42.07 38.28c5.196 4.735 7.844 11.24 7.844 17.78c0 13.22-10.71 24-24 24c-5.781 0-11.53-2.064-16.16-6.254l-88-80.05C2.844 269.1 0 262.7 0 255.1c0-6.755 2.844-13.37 7.844-17.9l88-80.05C100.5 153.8 106.2 151.8 112 151.8c13.26 0 23.99 10.74 23.99 23.99c0 6.534-2.647 13.04-7.844 17.78L86.09 231.8H232V85.8L193.8 127.9C189 133.1 182.5 135.7 175.1 135.7c-13.16 0-23.1-10.66-23.1-24.03c0-5.765 2.061-11.55 6.25-16.15l80-88.06C242.8 2.502 249.4 0 256 0s13.22 2.502 17.75 7.505l80 88.06c4.189 4.603 6.25 10.39 6.25 16.15c0 13.35-10.81 24.03-24 24.03c-6.531 0-13.03-2.658-17.75-7.849L280 85.8v146h145.9l-42.07-38.28c-5.196-4.735-7.844-11.24-7.844-17.78c0-13.25 10.74-23.99 23.98-23.99c5.759 0 11.55 2.061 16.18 6.242l88 80.05C509.2 242.6 512 249.2 512 255.1z"
          ></path>
        </svg>
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
