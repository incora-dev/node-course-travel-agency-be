import { Controller, Get, Post, UseInterceptors, UploadedFile, Param, Res, Delete, HttpException, HttpStatus, Body } from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IImage } from './interface/image.interface';
import { ApiResponse, ApiUseTags, ApiConsumes, ApiImplicitFile, ApiImplicitParam } from '@nestjs/swagger';

@ApiUseTags('image')
@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @Post('upload/:hotelId')
    @ApiConsumes('multipart/form-data')
    @ApiImplicitFile({ name: 'file', required: true })
    @ApiResponse({ status: 201, description: '```Created ```' })
    @ApiResponse({ status: 403, description: '```Forbidden``` Only image files are allowed!' })
    @ApiResponse({ status: 404, description: '```Not found ``` Hotel with this id not found' })
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './files',
                filename: (req, file, callback) => {
                    const filename = file.originalname.replace(/ +?/g, '_');
                    callback(null, `${filename}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new HttpException('Only image files are allowed!', 403), false);
                }
                callback(null, true);
            },
        }),
    )
    async uploadedFile(@UploadedFile() file, @Param('hotelId') hotelId: number) {
        return await this.imageService.create({image: String(file.filename), hotelId: Number(hotelId)});
    }

    @Get(':id')
    @ApiImplicitParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: '```Ok```' })
    @ApiResponse({ status: 404, description: '```Not found```' })
    async seeUploadedFile(@Param('id') imageId, @Res() res) {
        const imgIsExist = await this.imageService.getOneByParams({ id: Number(imageId) });
        if (!imgIsExist) {
            throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return await res.sendFile(imgIsExist.image, { root: './files' });
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: '```Ok``` Successfully removed' })
    @ApiResponse({ status: 404, description: '```Not Found```' })
    async delete(@Param('id') id: number): Promise<IImage> {
        return await this.imageService.delete(id);
    }
}
