export enum EventStatus {
    COMPLETED = 'completed',
    PLANNED = 'planned',
    IN_PROGRESS = 'in_progress'
}

export enum EventType {
    PUBLIC = 'public',
    PRIVATE = 'private'
}

export type EventShortInfo = {
    id?: number;
    status: EventStatus;
    title: string;
    type: EventType;
    participants: number;
    participantsLimit: number;
};


