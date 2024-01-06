import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError} from 'rxjs/operators';
import {merge, fromEvent, of, throwError} from 'rxjs';
import {Lesson} from "../model/lesson";


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    lessons: Lesson[] = [];
    displayedColumns = ['seqNo', 'description', 'duration'];

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {

    }

    ngOnInit() {

        this.course = this.route.snapshot.data['course'];

        this.loadLessonsPage();

    }

    ngAfterViewInit() {


    }

  private loadLessonsPage() {
    this.coursesService.findLessons(this.course.id, 'asc', 0, 3)
      .pipe(
        catchError(err => {
          console.log('error loading lessons page...');
          // return of([]); // empty observable
          alert('Error loading lessons page.');
          return throwError(err);
        })
      )
      .subscribe(lessons => this.lessons = lessons);
  }
}
