import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { PublicationSchema } from './publications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Publication', schema: PublicationSchema },
    ]),
  ],
  controllers: [PublicationsController],
  providers: [PublicationsService],
  exports: [
    PublicationsService,
    MongooseModule.forFeature([
      { name: 'Publication', schema: PublicationSchema },
    ]),
  ],
})
export class PublicationsModule {}
