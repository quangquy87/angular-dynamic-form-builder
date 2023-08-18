import { NgFor, NgForOf } from "@angular/common";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  CdkDrag,
  CdkDragMove,
  CdkDragPlaceholder,
  CdkDragRelease,
  CdkDropList,
} from "@angular/cdk/drag-drop";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";

import { FormlyFieldConfig } from "@ngx-formly/core";
import { TemplateBuilderService } from "@app/shared/template-builder.service";
import { debounceTime, startWith, tap } from "rxjs";

@Component({
  selector: "all-controls",
  templateUrl: "./all-controls.component.html",
  standalone: true,
  imports: [NgFor, NgForOf, CdkDrag, CdkDropList, CdkDragPlaceholder],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: "flex flex-grow w-full" },
})
export class AllControlsComponent implements OnInit, AfterViewInit {
  readonly #templateBuilderService = inject(TemplateBuilderService);
  readonly #destroyRef = inject(DestroyRef);

  @ViewChildren(CdkDropList) dropList!: QueryList<CdkDropList>;

  readonly conectedList = this.#templateBuilderService.dropList;

  readonly basicFieldConfigs: FormlyFieldConfig[] = [
    {
      key: "Input",
      name: "Input",
      type: "input",
      wrappers: ["drag-wrapper"],
      props: {
        label: "Input",
        placeholder: "Placeholder",
        description: "Description",
      },
    },

    {
      key: "Textarea",
      name: "Textarea",
      type: "textarea",
      wrappers: ["drag-wrapper"],
      props: {
        label: "Textarea",
        placeholder: "Placeholder",
        description: "Description",
        required: true,
      },
    },

    {
      key: "Checkbox",
      name: "Checkbox",
      type: "checkbox",
      wrappers: ["drag-wrapper"],
      props: {
        label: "Accept terms",
      },
    },

    {
      key: "Select",
      name: "Select",
      type: "select",
      wrappers: ["drag-wrapper"],
      props: {
        label: "Select",
        placeholder: "Placeholder",
        description: "Description",
        required: true,
        options: [
          { value: 1, label: "Option 1" },
          { value: 2, label: "Option 2" },
          { value: 3, label: "Option 3" },
          { value: 4, label: "Option 4", disabled: true },
        ],
      },
    },
  ];

  readonly layoutFieldConfigs: FormlyFieldConfig[] = [
    {
      type: "droplist",
      name: "Group",
      wrappers: ["drag-wrapper"],
      fieldGroup: [],
    },
  ];

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dropList.changes
      .pipe(
        startWith(true),
        tap(() => {
          const list = this.dropList.toArray();
          list.forEach((o) => {
            this.#templateBuilderService.registerCdkDropList(o);
          });
        }),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }

  noReturnPredicate() {
    return false;
  }
}
