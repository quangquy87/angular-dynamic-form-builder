import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyFieldDroplist } from '../droplist/droplist.type';
import { FormlyDragWrapper } from '../drag-wrapper/drag-wrapper';

@NgModule({
  imports: [
    CommonModule,
    FormlyNgZorroAntdModule,

    FormlyModule.forRoot({
      types:[
        ...FormlyFieldDroplist.register([FormlyDragWrapper.wrapperName]),
      ],
      wrappers: [
        ...FormlyDragWrapper.register(),
       
      ],
    })
  ],
  declarations: [],
exports:[
  FormlyNgZorroAntdModule,
  FormlyModule
]
})
export class FormlyBuilderModule { }