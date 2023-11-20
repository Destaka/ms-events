const dynamoose = require("dynamoose");
import { SchemaDefinition } from 'dynamoose/dist/Schema'

const schema: SchemaDefinition = {
  pk: {
    type: String,
    hashKey: true,
    required: true,
    index: {
      name: 'eventsCreatedAt',
      type: 'global',
      rangeKey: 'createdAt',
    }
  },
  sk: {
    type: String,
    rangeKey: true,
    required: true,
  },
  eventId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  }
}

export const EventModel = dynamoose.model('Events', new dynamoose.Schema(schema, { timestamps: true }));