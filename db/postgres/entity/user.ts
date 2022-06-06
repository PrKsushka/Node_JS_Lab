import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import UserTypes from '../../types/user.types';

@Entity()
class User implements UserTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}

export default User;
