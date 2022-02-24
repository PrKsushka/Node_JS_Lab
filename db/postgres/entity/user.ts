import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import UserType from '../../types/userType';

@Entity()
class User implements UserType {
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
