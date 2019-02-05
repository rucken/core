import { translate } from '@rucken/core';
import { ContentTypesFrameComponent } from './content-types-frame.component';
import { MetaGuard } from '@ngx-meta/core';

export const CONTENT_TYPES_FRAME_ROUTES = [
  {
    path: '',
    component: ContentTypesFrameComponent,
    canActivate: [MetaGuard],
    data: {
      name: 'content-types',
      meta: {
        title: translate('Content types'),
        description: translate('Content types frame')
      }
    }
  }
];
