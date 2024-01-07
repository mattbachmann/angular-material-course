import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Course} from '../model/course';
import {CoursesService} from '../services/courses.service';
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize} from 'rxjs/operators';
import {merge, fromEvent, of, throwError} from 'rxjs';
import {Lesson} from "../model/lesson";


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {
  readonly DEFAULT_PAGE_SIZE = 3;

  @ViewChild(MatPaginator) paginator: MatPaginator; // Use first reference of MatPaginator
  @ViewChild(MatSort) sort: MatSort; // Use first reference of MatSort

  course: Course;

  lessons: Lesson[] = [];
  displayedColumns = ['seqNo', 'description', 'duration'];
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {

  }

  ngOnInit() {

    this.course = this.route.snapshot.data['course'];

    this.loadLessonsPage();

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0); // reset paginator when sort is changed

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadLessonsPage())
      )
      .subscribe();

  }

  private loadLessonsPage() {
    this.loading = true; // set loading to true

    this.coursesService.findLessons(
      this.course.id,
      this.sort?.direction ?? 'asc',
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? this.DEFAULT_PAGE_SIZE,
      this.sort?.active ?? 'seqNo',
    )
      .pipe(
        catchError(err => {
          console.log('error loading lessons page...');
          // return of([]); // empty observable
          alert('Error loading lessons page.');
          return throwError(err);
        }),
        finalize(() => this.loading = false), // reset loading to false
      )
      .subscribe(lessons => this.lessons = lessons);
  }
}
