// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Todo, EventEntity } = initSchema(schema);

export {
  Todo,
  EventEntity
};