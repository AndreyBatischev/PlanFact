import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('plan_fact')
export class PlanFact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  object: string;

  @Column()
  workType: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  planAmount: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  factAmount: number;
}
