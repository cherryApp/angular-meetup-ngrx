import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, switchMap } from 'rxjs';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Get page title based on the current url.
  title$: Observable<string> = this.activatedRoute.fragment.pipe(
    map( fragment => this.config.navItems.find(i => {
      console.log( fragment )
      return '';
//        return i.href === `/${url.toString()}`;
      })?.text || ''
    ),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private config: ConfigService,
  ) {}

}
