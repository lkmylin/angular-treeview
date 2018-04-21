# angular-treeview

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.4.

It uses [ng-packagr](https://github.com/dherges/ng-packagr) to create a portable component library for Angular apps.

## Build

Run `npm run packagr` to build the project. The build artifacts will be stored in the `angular-treeview` subdirectory.

## Demo

Run `ng build` to build the demo.

Run `ng serve -o` to run the demo.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Installation

Run `npm install @lkmylin/angular-treeview --save`

Run `npm install @lkmylin/angular-statemanager --save`

## Implementation

In your bootstrap module:

* `import { HttpModule } from "@angular/http";`

* `import { TreeviewModule } from "@lkmylin/angular-treeview";`

* `import { StateManagerModule, StateManager } from "@lkmylin/angular-statemanager";`

* add `StateManager` to your providers

* add `{provide: "window", useValue: window}` to your providers

* add `HttpModule` to your imports

* add a TreeviewComponent: `<lkm-treeview treeid="myTree" datasource="treeDataUrl"></lkm-treeview>`

    * `treeDataUrl` can be any URL that returns json, e.g. a static file or REST API. It must return
      an array of objects of the following form:

        * `TreeKey: number;`

        * `ParentKey: number;` (The TreeKey of the parent node, or zero for root nodes)

        * `Title: string;`