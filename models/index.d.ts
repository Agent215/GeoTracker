import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  constructor(init: ModelInit<Todo>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo>) => MutableModel<Todo> | void): Todo;
}

export declare class EventEntity {
  readonly id: string;
  readonly title: string;
  readonly category: string;
  readonly sourceLink: string;
  readonly locationList: string;
  readonly isClosed: string;
  readonly currentLat: string;
  readonly currentLong: string;
  readonly eventId: string;
  readonly currentDate: string;
  constructor(init: ModelInit<EventEntity>);
  static copyOf(source: EventEntity, mutator: (draft: MutableModel<EventEntity>) => MutableModel<EventEntity> | void): EventEntity;
}