import { Module, DynamicModule } from '@nestjs/common';
import { KawaidaDto } from './dto/index.dto';
import { KawaidaEntity } from './entities/index.entity';


@Module({
    exports: [KawaidaDto, KawaidaEntity]
})

export class KawaidaModule{}