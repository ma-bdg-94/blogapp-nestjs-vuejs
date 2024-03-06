import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AddPublicationDTO } from './dto/add_publication.dto';
import { PublicationsService } from './publications.service';
import { Publication } from './interfaces/publication.interface';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {

  }

  @Get()
  findAll(): Promise<Publication[]> {
    return this.publicationsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: any): Promise<Publication> {
    return this.publicationsService.findOne(id)
  }

  @Post()
  addPublication(@Body() addPublicationDTO: AddPublicationDTO): Promise<Publication> {
    return this.publicationsService.addPublication(addPublicationDTO)
  }

  @Delete(':id')
  deleteOne(@Param('id') id: any): Promise<Publication> {
    return this.publicationsService.deleteOne(id)
  }

  @Put(':id')
  updateOne(@Param('id') id: any, @Body() updatePublicationDTO: AddPublicationDTO) {
    return this.publicationsService.updateOne(id, updatePublicationDTO)
  }
}
