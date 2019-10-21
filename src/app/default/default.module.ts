import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DefaultComponent } from './default.component';
import { DefaultRoutes } from './default.routing';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { ConversationViewComponent } from './conversation-view/conversation-view.component';
import { ThreadViewComponent } from './thread-view/thread-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(DefaultRoutes)
  ],
  declarations: [DefaultComponent,ConversationListComponent, ConversationViewComponent, ThreadViewComponent]
})
export class DefaultModule {}
