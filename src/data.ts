export interface JobParameters {
    id: string
    module: string
    tableId?: string
    sr: SearchRequest
    authKey: string
    webhookTarget: string
}

export interface SearchRequest {
    fields: string[]
    offset: number
    limit: number
}