# WorkoutApp

Frontend for a Workout Tracking App

## Known Issues

### UI

Save sets flow has been condensed (smaller weight/reps inputs, tighter card and dashboard spacing) but still needs real-device UX testing to confirm it no longer requires excessive scrolling.

Card width is set with `max-width: 45vw`. The routine page stacks to a single column at <=768px, but the two-column 45vw layout can feel cramped at narrow desktop / tablet widths and could use further responsive tuning.

Cross-column drag & drop index behavior on long routine/workout lists has not yet been verified in a running build (see Resolved below).

### Resolved

Routine creation drag & drop refactored from a wrapping horizontal list to vertical lists, with Workouts on the left and Routine on the right. This fixes the orientation/wrap mismatch (`cdkDropListOrientation="horizontal"` over a `flex-flow: row wrap` grid) that mis-placed cards on larger workout sizes.

Save sets validation implemented. The frontend validates reps (required, whole number, 1-1000) and weight (required, -2000 to 2000); the backend now enforces reps `@Min(1)` via `@Valid` on the set-logging endpoint, where the constraint was previously dormant (missing `@Valid`). Negative weight is intentionally allowed on both ends (assisted / banded movements).

Navbar icons no longer depend on the external Material Icons font. The menu / arrow_drop_down / logout glyphs are registered as inline SVG literals (`MatIconRegistry.addSvgIconLiteral`) and ship in the JS bundle, so mobile content blockers that block the Google Fonts request no longer leave the hamburger rendering as the literal text "menu".


## Angular Specific Readme

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6. Uses angular 21 now

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
