import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ArchiveService } from './archive.service';
import { CreateArchive } from './dto/create-archive';
import { Archive } from './entity/archive';

@Resolver(() => Archive)
export class ArchiveResolver {
  constructor(private readonly archiveService: ArchiveService) {}

  @Mutation(() => Archive, { name: 'createArchive' })
  async createArchive(
    @Args('archive') archive: CreateArchive,
  ): Promise<Archive> {
    return this.archiveService.createArchive(archive);
  }

  @Query(() => [Archive], { name: 'findAllArchives' })
  async archives(): Promise<Archive[]> {
    return this.archiveService.findAllArchives();
  }
}
