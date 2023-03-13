import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DBTable } from "../constant/DbTable";
import { Book } from "./Book";

@Entity(DBTable.AUTHORS)
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany((type) => Book, (book) => book.author)
  books: Book[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // toPayload(): Author {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     bio: this.bio,
  //     image: ImageUtil.prepareUrl("authors", this.image),
  //     createdAt: this.createdAt,
  //     updatedAt: this.updatedAt,
  //   } as Author;
  // }
}
