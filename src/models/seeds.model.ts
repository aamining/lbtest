import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Seeds extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  comm: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Seeds>) {
    super(data);
  }
}

export interface SeedsRelations {
  // describe navigational properties here
}

export type SeedsWithRelations = Seeds & SeedsRelations;
