import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";


@Component({
  selector: "create-course-step-1",
  templateUrl: "create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"]
})
export class CreateCourseStep1Component {
  private readonly SAMPLE_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' + 'Vivamus quis tempor massa. Donec euismod elit vitae enim varius, ' + 'et ultrices lacus tincidunt. Sed eu nisi sit amet magna lobortis ' + 'consequat. Nullam aliquam urna sed aliquet lobortis. ' + 'Suspendisse potenti. Nullam nec diam et dolor lobortis ' + 'condimentum. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ' + 'Nulla facilisi. Nulla facilisi. Nulla facilisi. ';

  form = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(60)
    ]],
    releasedAt: [new Date(), Validators.required],
    category: ['BEGINNER', Validators.required],
    courseType: ['premium', Validators.required],
    downloadsAllowed: [false, Validators.requiredTrue],
    longDescription: [this.SAMPLE_TEXT, [Validators.required, Validators.minLength(3)]]
  });

  getDateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    const dayOfWeek = cellDate.getDay();
    return (dayOfWeek === 0 || dayOfWeek === 6) ? 'highlight-date' : '';
  };

  holidayDateFilter = (date: Date): boolean => {
    const dayOfWeek = date?.getDay();
    return !!dayOfWeek && (dayOfWeek !== 0 && dayOfWeek !== 6);
  };

  constructor(private fb: UntypedFormBuilder) {

  }


  get courseTitle() {
    return this.form.controls['title'];
  }

}
