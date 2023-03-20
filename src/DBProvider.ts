import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource, EntityManager } from 'typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';

let manager: EntityManager;
@Injectable()
export class DBProvider {
  private dataSource: DataSource | void;
  constructor(private readonly configService: ConfigService) {}
  private dbConfigPostgres() {
    return {
      autoLoadEntities: true,
      synchronize: true,
      host: this.configService.get('DB_HOST'),
      port: +this.configService.get<number>('DB_PORT'),
      username: this.configService.get('DB_USER'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
    };
  }
  async onModuleInit() {
    const entities = [UserEntity];
    const config = this.dbConfigPostgres();

    this.dataSource = await new DataSource({
      type: 'postgres',
      ...config,
      entities,
    })
      .initialize()
      .catch((error) => {
        console.log(error);
        process.exit(1);
      });

    manager = (this.dataSource as DataSource).manager;
  }
  static get manager() {
    return manager;
  }
}