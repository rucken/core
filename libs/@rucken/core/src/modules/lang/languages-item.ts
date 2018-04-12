export class LanguagesItem {
  title: string;
  code: string;
  translations: { [key: string]: string | { [key: string]: string } }[];
}
