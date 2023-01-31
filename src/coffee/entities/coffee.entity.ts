import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';
@Entity('coffee') // sql table === 'coffee
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  brand: string;
  @Column({ default: 0 })
  recommendation: number;
  // @Column('json', { nullable: true })
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, {
    cascade: true, // 级联插入，具有这个参数的话创建Coffee时将自动创建相应的flavor
  })
  flavors: Flavor[];
}
