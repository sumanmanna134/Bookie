import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DBTable } from "../constant/DbTable";
import { Author } from "./Author";
  
@Entity(DBTable.BOOKS)
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne((type) => Author, (author) => author.books, { eager: true })
  author: Author;

  @Column()
  authorId: number;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
