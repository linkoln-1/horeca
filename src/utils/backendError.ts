export class BackendError {
    constructor(
        public error: string,
        public statusCode: number,
        public msg?: string,
        public message?: string[]
    ) {}

    static isBackendError(data: any): data is BackendError {
        // Проверяем, что в data присутствуют необходимые ключи
        return (
            ['error', 'statusCode', 'msg'].filter(x => x in data).length === 3
        )
    }
}
