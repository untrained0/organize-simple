import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiKey } from './api-key.entity';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => ApiKey, (ApiKey) => ApiKey.application)
  apiKeys: Promise<ApiKey[]>;
}
