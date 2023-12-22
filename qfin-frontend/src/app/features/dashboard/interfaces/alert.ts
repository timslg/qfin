export enum AlertType {
    Error,
    Success
}

export interface Alert {
    id: number;
    type: AlertType;
    message: string;
}