import { translate } from '@rucken/core';
import { ContentTypesFrameComponent } from './content-types-frame.component';

export const ContentTypesFrameRoutes = [{
  path: '',
  component: ContentTypesFrameComponent,
  data: {
    name: 'content-types',
    title: translate('Content types')
  }
}];
