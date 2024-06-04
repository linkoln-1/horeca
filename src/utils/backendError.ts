import { ErrorDto } from '@/shared/lib/horekaApi/Api'

export class BackendError {
    constructor(
        public error: string,
        public statusCode: number,
        public errorMessage: ErrorDto['errorMessage'],
        public message?: string[]
    ) {}

    static isBackendError(data: any): data is BackendError {
        return (
            ['error', 'statusCode', 'errorMessage'].filter(x => x in data)
                .length === 3
        )
    }
}
