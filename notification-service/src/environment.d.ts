declare global {
    namespace NodeJS {
        interface ProcessEnv {
            EMAIL_SERVICE: string;
            EMAIL_NAME: string;
            EMAIL_PASSWORD: string;
        }
    }
}

export { }