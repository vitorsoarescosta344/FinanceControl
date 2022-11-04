import {Realm} from '@realm/react';

export class Finances extends Realm.Object {
  static generate(name, type, category, value) {
    return {
      _id: new Realm.BSON.ObjectId(),
      name,
      type,
      category,
      value,
      createdAt: new Date(),
    };
  }

  static schema = {
    name: 'Finances',
    properties: {
      _id: 'objectId',
      name: 'string',
      type: 'string',
      category: 'string?',
      value: 'string',
      createdAt: 'date',
    },
    primaryKey: '_id',
  };
}
