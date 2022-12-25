import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Seeds} from '../models';
import {SeedsRepository} from '../repositories';

export class SeedsController {
  constructor(
    @repository(SeedsRepository)
    public seedsRepository : SeedsRepository,
  ) {}

  @post('/seeds')
  @response(200, {
    description: 'Seeds model instance',
    content: {'application/json': {schema: getModelSchemaRef(Seeds)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seeds, {
            title: 'NewSeeds',
            exclude: ['_id'],
          }),
        },
      },
    })
    seeds: Omit<Seeds, '_id'>,
  ): Promise<Seeds> {
    return this.seedsRepository.create(seeds);
  }

  @get('/seeds/count')
  @response(200, {
    description: 'Seeds model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Seeds) where?: Where<Seeds>,
  ): Promise<Count> {
    return this.seedsRepository.count(where);
  }

  @get('/seeds')
  @response(200, {
    description: 'Array of Seeds model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Seeds, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Seeds) filter?: Filter<Seeds>,
  ): Promise<Seeds[]> {
    return this.seedsRepository.find(filter);
  }

  @patch('/seeds')
  @response(200, {
    description: 'Seeds PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seeds, {partial: true}),
        },
      },
    })
    seeds: Seeds,
    @param.where(Seeds) where?: Where<Seeds>,
  ): Promise<Count> {
    return this.seedsRepository.updateAll(seeds, where);
  }

  @get('/seeds/{id}')
  @response(200, {
    description: 'Seeds model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Seeds, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Seeds, {exclude: 'where'}) filter?: FilterExcludingWhere<Seeds>
  ): Promise<Seeds> {
    return this.seedsRepository.findById(id, filter);
  }

  @patch('/seeds/{id}')
  @response(204, {
    description: 'Seeds PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Seeds, {partial: true}),
        },
      },
    })
    seeds: Seeds,
  ): Promise<void> {
    await this.seedsRepository.updateById(id, seeds);
  }

  @put('/seeds/{id}')
  @response(204, {
    description: 'Seeds PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() seeds: Seeds,
  ): Promise<void> {
    await this.seedsRepository.replaceById(id, seeds);
  }

  @del('/seeds/{id}')
  @response(204, {
    description: 'Seeds DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.seedsRepository.deleteById(id);
  }
}
