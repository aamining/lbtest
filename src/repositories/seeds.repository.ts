import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Seeds, SeedsRelations} from '../models';

export class SeedsRepository extends DefaultCrudRepository<
  Seeds,
  typeof Seeds.prototype._id,
  SeedsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Seeds, dataSource);
  }
}
