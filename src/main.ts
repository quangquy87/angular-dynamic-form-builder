import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TemplateBuilderComponent } from '@app/template-builder/template-builder.component';


@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, TemplateBuilderComponent],
  template: `<template-builder/>`,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
