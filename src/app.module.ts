import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProjectModule } from './project/project.module';
import { EmployeeModule } from './employee/employee.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CurrentMonthDiscountModule } from './current-month-discount/current-month-discount.module';
import { StudentModule } from './student/student.module';
import { LevelModule } from './level/level.module';
import { DivisionModule } from './division/division.module';
import { StuabsentModule } from './stuabsent/stuabsent.module';
import { EmpabsentModule } from './empabsent/empabsent.module';
import { StudyYearModule } from './study-year/study-year.module';
import { ArchiveModule } from './archive/archive.module';
import { SemesterModule } from './semester/semester.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),

          //  port: 5432,
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          // database: 'postgres',
          database: config.get('DB_NAME'),

          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      sortSchema: true,
      cors: {
        origin: 'http://localhost:3000',
        credentials: true,
      },
    }),
    ProjectModule,
    EmployeeModule,
    AuthModule,
    CurrentMonthDiscountModule,
    StudentModule,
    LevelModule,
    DivisionModule,
    StuabsentModule,
    EmpabsentModule,
    StudyYearModule,
    ArchiveModule,
    SemesterModule,
  ],
})
export class AppModule {}
