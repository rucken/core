export interface IEnvironment {
    server: boolean;
    type: 'prod' | 'development';
    production: boolean;
    apiUrl: string;
}
