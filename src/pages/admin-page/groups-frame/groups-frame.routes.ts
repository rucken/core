import { Routes } from '@angular/router';
import { GroupsFrameComponent } from './groups-frame.component';
import { translate } from '../../../shared/utils';

export const GroupsFrameRoutes: Routes = [
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
