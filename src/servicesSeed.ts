import {InternalServerErrorException, Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {SeederModule} from './database/seeders/seeder.module';
import {Seeder} from './database/seeders/seeder';

async function bootstrap() {
    try {
        const appContext = await NestFactory.createApplicationContext(SeederModule);

        const logger = appContext.get(Logger);
        const seeder = appContext.get(Seeder);

        try {
            await seeder.services();
            logger.debug('Seeding complete!');
        } catch (err) {
            logger.error('Seeding failed!', err.stack);
            throw new InternalServerErrorException();
        }

        await appContext.close();
    } catch (e) {
        throw e;
    }
}
bootstrap();
