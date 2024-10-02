import { Component, OnInit } from '@angular/core';
import {
  Observable,
  filter,
  first,
  forkJoin,
  from,
  map,
  of,
  reduce,
  scan,
  take,
  toArray,
} from 'rxjs';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  observable = new Observable(function subscribe(observer) {
    const id = setInterval(() => {
      observer.next(`Hello Minh`);
      // observer.error('Stop');
      observer.complete();
    }, 1000);

    return function unsubscribe() {
      observer.complete();
      clearInterval(id);
    };
  });

  source = new Observable<User>((observer) => {
    const user = [
      {
        id: 'ddfe3653-1569-4f2f-b57f-bf9bae542662',
        username: 'tiepphan',
        firstname: 'tiep',
        lastname: 'phan',
        postCount: 69,
      },
      {
        id: '34784716-019b-4868-86cd-02287e49c2d3',
        username: 'nartc',
        firstname: 'chau',
        lastname: 'tran',
        postCount: 96,
      },
    ];

    setTimeout(() => {
      observer.next(user[0]);
    }, 1000);

    setTimeout(() => {
      observer.next(user[1]);
      observer.complete();
    }, 3000);
  });

  observer2 = {
    next: (value: any) => console.log(value),
    error: (err: any) => console.log(err),
    complete: () => console.log('complete'),
  };

  ngOnInit(): void {
    //#region example 1: Create observable
    //this.example1();
    //#endregion example 1

    //#region example 2: pipe data return
    //this.example2();
    //#endregion example 2

    //#region example 3: filter data return
    //this.example3();
    //#endregion example3

    //#region example 4: combination
    //this.example5(); test regex
    //#endregion 4
  }

  example1() {
    const test = this.observable.subscribe({
      next: (value) => console.log(value),
      error: (error) => console.log(error),
      complete: () => console.log('Done'),
    });

    test.add(
      this.observable.subscribe({
        next: (value) => console.log(`${value}_add`),
      })
    );

    setTimeout(() => {
      test.unsubscribe();
    }, 2000);
  }

  example2() {
    // pipe => parse data return observable (User => {id,fullname})
    this.source
      .pipe(
        map((user) => {
          return {
            id: user.id,
            fullname: `${user.firstname} ${user.lastname}`,
          };
        })
      )
      .subscribe(this.observer2);
    //pipe data return real time
    this.source
      .pipe(scan((acc, curr) => acc + curr.postCount, 0))
      .subscribe(this.observer2);
    //pipe data return when observable complete
    this.source
      .pipe(reduce((acc, curr) => acc + curr.postCount, 0))
      .subscribe(this.observer2);
    //this.source.pipe(reduce((acc, curr) => [...acc, curr], [])).subscribe(this.observer2);
    this.source.pipe(toArray()).subscribe(this.observer2);
  }

  example3() {
    // pipe: filter observable real time (next item)
    from([1, 2, 3, 4, 5, 6, 7, 8, 9])
      .pipe(filter((item) => item % 2 === 0)) // <> first(), last(),...
      .subscribe(console.log, null, () => console.log('Done'));

    of().pipe(first()).subscribe(null, console.log, null);

    from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
      .pipe(take(5))
      .subscribe(console.log, null, () => console.log('Done'));
  }

  example4() {
    forkJoin([of(1), of('hello'), of({ foo: 'bar' })])
      // forkJoin({ one: of(1), helle: of('hello'), foo: of({ foo: 'bar' }) }) or
      .subscribe(this.observer2);
  }

  example5() {
    let regex =
      /YEAR(?<YEAR>\d{4})|year(?<year>\d{4})|MONTH(?<MONTH>\d{1,2})|month(?<month>\d{1,2})|DAY(?<DAY>\d{1,2})|day(?<day>\d{1,2})/gm;

    let remarkString = 'Berjt}YEAR1915testmonth11DATE12ABU12DAYDAY01';
    let m;

    var formattedDate = '';

    while ((m = regex.exec(remarkString)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      formattedDate += `${m[1] || m[2] || m[3] || m[4] || m[5] || m[6]}-`;
    }

    console.log(formattedDate.slice(0, -1));
  }

  getWeather() {
    this.authService.getWeather().subscribe((data) => {
      console.log(data);
    });
  }
}

interface User {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  postCount: number;
}
