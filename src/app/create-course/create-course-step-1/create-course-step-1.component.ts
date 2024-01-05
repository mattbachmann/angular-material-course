import {Component} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {MatCalendarCellClassFunction} from "@angular/material/datepicker";


@Component({
  selector: "create-course-step-1",
  templateUrl:"create-course-step-1.component.html",
  styleUrls: ["create-course-step-1.component.scss"]
})
export class CreateCourseStep1Component {

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
    longDescription: ['', [Validators.required, Validators.minLength(3)]]
  });

  getDateClass : MatCalendarCellClassFunction<Date> = (cellDate, view) => {
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
