import { FormGroup, AbstractControl } from "@angular/forms";

/**
 * Validates whether two controls have the same value or not. Used by the confirm password box in the register page.
 * @param controlName The control for which is matched
 * @param matchingControlName The control for which is matched
 */
export function MatchValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
