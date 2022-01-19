import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalFeedsComponent } from './components/global-feeds/global-feeds.component';

const routes: Routes = [
  {path:'',component:GlobalFeedsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GlobalFeedRoutingModule { }
