import { Module } from '@nestjs/common';
import { GenericResponseDto } from './dto/generic.dto';
import * as userDto from './dto/user.dto';
import * as companyDto from './dto/company.dto';
import { ConstantsService } from './constants';
import { User } from '../shared/entities/user.entity';
import { Company } from './entities/company.entity';

const moduleExports = [
    // Constants
    ConstantsService,
    // Models
    User, Company,
]

@Module({
    providers: moduleExports,
    exports: moduleExports,
})
export class SharedModule {}