import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, getRepository } from 'typeorm';
import { Image } from './image.entity';
import { ImageDTO } from './dto/image.dto';
import { IImage } from './interface/image.interface';
import { Hotel } from '../hotel/hotel.entity';

@Injectable()
export class ImageService {
    constructor(@Inject('IMAGE_REPOSITORY')
    private readonly imageRepository: Repository<Image>) {}

    async create(imageName: ImageDTO): Promise<IImage> {
        const hotelExist = await getRepository(Hotel)
            .createQueryBuilder('hotel')
            .where('hotel.id = :id', { id: imageName.hotelId })
            .getRawOne();
        if (!hotelExist) {
                throw new HttpException('Hotel with this id not found', 404);
            }
        return await this.imageRepository.save(imageName);
    }

    async delete(id: number): Promise<IImage> {
        const imageToRemove = await this.imageRepository.findOne(id);
        if (!imageToRemove) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return await this.imageRepository.remove(imageToRemove);
    }

    async getOneByParams(params: object): Promise<IImage> {
        return await this.imageRepository.findOne(params);
    }
}
