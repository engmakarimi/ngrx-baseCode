import { environment } from './../environments/environment';
import { getUserAction } from './auth/store/actions/getUser.action';
import { Store } from '@ngrx/store';
import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddToHomeScreenService } from './shared/services/addToHomeScreen.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // event before installing and use it for installing pwa
  @HostListener('window:beforeinstallprompt', ['$event'])
  onEventFire(e: any) {
    console.log('window:beforeinstallprompt is firing ');
    e.preventDefault();
    this.a2hs.deferredPrompt = e;
  }
  // event after install pwa
  @HostListener('window:appinstalled', ['$event'])
  onEventInstallFire(e: any) {
    //   hideInstallPromotion();
    this.a2hs.deferredPrompt = null;
    this.installed = true;
    console.log('PWA was installed');
    alert('PWA was installed');
  }
  @HostListener('document:contextmenu', ['$event'])
  onEventRightClick(e: any) {
    if (this.installed) {
      e.preventDefault();
    }
  }

  isAddToHomeScreenEnabled$: BehaviorSubject<boolean>;
  installed: boolean = false;
  appVersion: string = '';
  constructor(
    private store: Store,
    private sw: SwUpdate,
    private modalService: NgbModal,
    public a2hs: AddToHomeScreenService
  ) {
    this.isAddToHomeScreenEnabled$ = this.a2hs.deferredPromptFired;
  }
  ngOnInit() {
    this.appVersion = environment.appVersion;

    this.store.dispatch(getUserAction());
    
    if (this.sw.isEnabled) {
      window.alert('hello');
      this.sw.versionUpdates.subscribe((event) => {
        console.log(event);
        if (event) {
          window.alert('version update');
          this.sw.activateUpdate().then((p) => {
            location.reload();
          });
        }
      });
    }
    //show install banner to user when initial application ;
    // this.isAddToHomeScreenEnabled$.subscribe((p) => {
    //   console.log(p);
    //   this.a2hs.showPrompt();
    // });
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          alert('result');
          this.a2hs.showPrompt();
        },
        (reason) => {}
      );
  }
}
