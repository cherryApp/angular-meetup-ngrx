import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { ConfigService } from './service/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Get page title based on the current url.
  title$: Observable<string> = this.router.events.pipe(
    filter( event => event instanceof NavigationEnd),
    map( () => this.config.navItems.find(i => i.href === this.router.url)?.text || '' ),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private config: ConfigService,
  ) {}

}
