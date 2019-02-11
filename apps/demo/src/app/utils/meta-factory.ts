import { MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@ngx-meta/core';
import { TranslateService } from '@ngx-translate/core';
import { config } from '../config/config';

export function metaFactory(translateService: TranslateService): MetaLoader {
    return new MetaStaticLoader({
        callback: (key: string) => {
            return translateService.get(key);
        },
        pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
        pageTitleSeparator: ' - ',
        applicationName: config.app.title,
        defaults: {
            title: config.app.title,
            description: config.app.description,
            'og:type': 'website',
            'og:locale': 'en_US',
            'og:locale:alternate': 'en_US,ru_RU'
        }
    });
}
