import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  cpf: string;
  @Column()
  cep: number;
  @Column()
  address: string;
  @Column()
  number: number;
  @Column()
  city: string;
  @Column()
  state: string;
  @Column()
  country: string;
  @Column()
  email: string;
  @Column()
  password: string;
}
