import { UUIDVersion } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  nome: string;
  @Column()
  telefone: string;
  @Column({unique: true})
  cpf: string;
  @Column()
  cep: number;
  @Column()
  logradouro: string;
  @Column()
  numero: number;
  @Column()
  cidade: string;
  @Column()
  estado: string;
  @Column()
  password: string;
}
