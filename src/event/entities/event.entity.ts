import { PrimaryGeneratedColumn, Entity, Column, Index } from 'typeorm';
@Index(['name', 'type'])
// 创建索引加快查询有效返回速度
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  type: string;
  @Column()
  name: string;
  @Column('json')
  payload: Record<string, unknown>;
}
