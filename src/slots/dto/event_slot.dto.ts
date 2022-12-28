export class EventSlotsDTO {
  readonly event: {
    readonly eventType: string;
    readonly eventId: number;
  };
  readonly slots: {
    readonly [key: string]: string[];
  };
}
