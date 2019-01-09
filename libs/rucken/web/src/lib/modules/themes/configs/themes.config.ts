import { IThemesConfig } from '../interfaces/themes-config.interface';

export const defaultThemesConfig: IThemesConfig = {
  mockedItems: [
    {
      name: 'Default',
      url: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'
    },
    {
      name: 'Cerulean',
      url: 'https://bootswatch.com/3/cerulean/bootstrap.min.css'
    },
    { name: 'Cosmo', url: 'https://bootswatch.com/3/cosmo/bootstrap.min.css' },
    {
      name: 'Cyborg',
      url: 'https://bootswatch.com/3/cyborg/bootstrap.min.css'
    },
    {
      name: 'Darkly',
      url: 'https://bootswatch.com/3/darkly/bootstrap.min.css'
    },
    {
      name: 'Flatly',
      url: 'https://bootswatch.com/3/flatly/bootstrap.min.css'
    },
    {
      name: 'Journal',
      url: 'https://bootswatch.com/3/journal/bootstrap.min.css'
    },
    { name: 'Lumen', url: 'https://bootswatch.com/3/lumen/bootstrap.min.css' },
    { name: 'Paper', url: 'https://bootswatch.com/3/paper/bootstrap.min.css' },
    {
      name: 'Readable',
      url: 'https://bootswatch.com/3/readable/bootstrap.min.css'
    },
    {
      name: 'Sandstone',
      url: 'https://bootswatch.com/3/sandstone/bootstrap.min.css'
    },
    {
      name: 'Simplex',
      url: 'https://bootswatch.com/3/simplex/bootstrap.min.css'
    },
    { name: 'Slate', url: 'https://bootswatch.com/3/slate/bootstrap.min.css' },
    {
      name: 'Spacelab',
      url: 'https://bootswatch.com/3/spacelab/bootstrap.min.css'
    },
    {
      name: 'Superhero',
      url: 'https://bootswatch.com/3/superhero/bootstrap.min.css'
    },
    {
      name: 'United',
      url: 'https://bootswatch.com/3/united/bootstrap.min.css'
    },
    { name: 'Yeti', url: 'https://bootswatch.com/3/yeti/bootstrap.min.css' }
  ],
  storageKeyName: 'theme'
};
export const THEMES_CONFIG_TOKEN = 'ThemesConfig';
