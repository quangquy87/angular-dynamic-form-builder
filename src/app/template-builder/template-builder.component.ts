import {
  afterNextRender,
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FormlyFieldConfig } from "@ngx-formly/core";

import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { AllControlsComponent } from "./components/all-controls/all-controls.component";
import { FormlyBuilderModule } from "@app/controls/formly-builder/formly-builder.module";
import { TemplateBuilderService } from "@app/shared/template-builder.service";
import { NzFormModule } from "ng-zorro-antd/form";

@Component({
  selector: "template-builder",
  templateUrl: "./template-builder.component.html",
  standalone: true,
  imports: [
    FormlyBuilderModule,
    NzFormModule,
    ReactiveFormsModule,

    CdkDropListGroup,
    CdkDropList,
    CdkDrag,

    AllControlsComponent,
  ],
  host: { class: "flex flex-grow" },
})
export class TemplateBuilderComponent implements OnInit, AfterViewInit {
  readonly #templateBuilderService = inject(TemplateBuilderService);

  @ViewChild(CdkDropList) dropList?: CdkDropList;

  readonly conectedList = this.#templateBuilderService.dropList;

  form = new FormGroup({});
  model = {};

  readonly fields = this.#templateBuilderService.fields;

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.dropList) {
      this.#templateBuilderService.registerCdkDropList(this.dropList);
    }
  }

  drop(event: CdkDragDrop<FormlyFieldConfig[]>) {
    console.log("ev", event);
    if (event.container === event.previousContainer) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const field = event.item.data as FormlyFieldConfig;
      this.#templateBuilderService.addFieldConfig(event.currentIndex, field);
    }
  }
}
