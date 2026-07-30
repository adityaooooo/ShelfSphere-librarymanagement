import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';



export enum UserRole {
  MEMBER = 'MEMBER',
  LIBRARIAN = 'LIBRARIAN',
  ADMIN = 'ADMIN',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  phone: string;

  @Column({
    nullable: true,
    unique: true,
  })
  memberId: string;

  @Column({
    nullable: true,
    unique: true,
  })
  staffId: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.MEMBER,
  })
  role: UserRole;

 
}
