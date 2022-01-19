import { FeedModule } from './../shared/modules/feed/feed.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalFeedRoutingModule } from './global-feed-routing.module';
import { GlobalFeedsComponent } from './components/global-feeds/global-feeds.component';


@NgModule({
  declarations: [
    GlobalFeedsComponent
  ],
  imports: [
    CommonModule,
    GlobalFeedRoutingModule,
    FeedModule
  ]
})
export class GlobalFeedModule { }
