import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { CurrentUserInterface } from 'src/app/shared/types';
import {
  isAnonymousSelector,
  isLoggedSelector,
  currentUserSelector,
} from './../../../auth/store/selectors';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  isLoggedIn$: Observable<boolean | null>;
  isAnonymous$: Observable<boolean>;
  currentUser$: Observable<CurrentUserInterface | null>;

  constructor(private store: Store<AppStateInterface>) {
    this.isLoggedIn$ = this.store.pipe(select(isLoggedSelector));
    this.currentUser$ = this.store.pipe(select(currentUserSelector));
    this.isAnonymous$ = this.store.pipe(select(isAnonymousSelector));
  }

  ngOnInit() {}
}
