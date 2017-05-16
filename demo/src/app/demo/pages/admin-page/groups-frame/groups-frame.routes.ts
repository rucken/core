import { Routes } from '@angular/router';
import { GroupsFrameComponent } from './../../../../../../../dist';
import { translate } from './../../../../../../../dist/shared/utils';

export const DemoGroupsFrameRoutes: Routes = [
  {
    path: '',
    component: GroupsFrameComponent,
    data: {
      name: 'groups',
      title: translate('Groups'),
      visible: true
    }
  }
];
