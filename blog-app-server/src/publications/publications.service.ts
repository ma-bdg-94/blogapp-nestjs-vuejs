import { Injectable } from '@nestjs/common';
import { Publication } from './interfaces/publication.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectModel('Publication')
    private readonly publicationModel: Model<Publication>,
  ) {}

  async findAll(): Promise<Publication[]> {
    return await this.publicationModel.find();
  }

  async findOne(id: string): Promise<Publication> {
    return await this.publicationModel.findOne({ _id: id });
  }

  async addPublication(publication: Publication): Promise<Publication> {
    const newPublication = new this.publicationModel(publication);
    return await newPublication.save();
  }

  async deleteOne(id: string): Promise<Publication> {
    return await this.publicationModel.findOneAndDelete({ _id: id });
  }

  async updateOne(id: string, publication: Publication): Promise<Publication> {
    return await this.publicationModel.findOneAndUpdate(
      { _id: id },
      { $set: publication },
      { new: true },
    );
  }
}
