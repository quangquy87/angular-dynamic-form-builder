import {
  CdkDrag,
  CdkDragMove,
  CdkDragRelease,
  CdkDropList,
} from "@angular/cdk/drag-drop";
import { DOCUMENT } from "@angular/common";
import { Injectable, inject, signal } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { slice } from "lodash";
import { remove, update } from "@rx-angular/cdk/transformations";

@Injectable({ providedIn: "root" })
export class TemplateBuilderService {
  readonly #state = {
    $dropList: signal<CdkDropList[]>([]),
    $fields: signal<FormlyFieldConfig[]>([
      // {
      //   type: "droplist",
      //   fieldGroup: [],
      // },
    ]),
  } as const;

  readonly dropList = this.#state.$dropList.asReadonly();
  readonly fields = this.#state.$fields.asReadonly();

  public registerCdkDropList(dropList: CdkDropList) {
    const index = this.dropList().findIndex((o) => o.id === dropList.id);
    if (index === -1) this.#state.$dropList.mutate((s) => s.push(dropList));
  }

  removeCdkDropList(id: string) {
    this.#state.$dropList.update((list) =>
      remove(list, { id }, (a, b) => a.id === b.id)
    );
  }

  addFieldConfig(currentIndex: number, field: FormlyFieldConfig) {
    const to = this.clamp(currentIndex, this.fields().length);
    this.#state.$fields.update((fields) => this.insertAt(fields, to, field));
  }

  addFieldConfigToDropList(
    dropListId: string,
    currentIndex: number,
    field: FormlyFieldConfig
  ) {
    this.#state.$fields.update((fields) => {
      const fieldDropList = fields.find((o) => o.id === dropListId);
      const toIndex = this.clamp(
        currentIndex,
        fieldDropList?.fieldGroup?.length ?? 0
      );

      return update(
        fields,
        {
          ...fieldDropList,
          fieldGroup: this.insertAt(
            fieldDropList?.fieldGroup ?? [],
            toIndex,
            field
          ),
        },
        (a, b) => a.id === dropListId
      );
    });
  }

  clamp(value: number, max: number): number {
    return Math.max(0, Math.min(max, value));
  }

  insertAt = (
    arr: FormlyFieldConfig[],
    index: number,
    newItem: FormlyFieldConfig
  ): FormlyFieldConfig[] => [
    ...slice(arr, 0, index),
    newItem,
    ...slice(arr, index),
  ];
}
