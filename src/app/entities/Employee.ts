import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Department } from "./Department";


@Entity("employee")
    export class Employee extends AbstractEntity{
        @PrimaryGeneratedColumn("uuid")
        public id: string;
        @Column({ nullable: false })
        public name: string;
        @Column({nullable: false})
        public experience: number;
        @Column({nullable: false})
        public username: string;
        @Column({nullable: false})
        public password: string;

        @ManyToOne(() => Department, { cascade: true })
        @JoinColumn()
        public department: Department;
        @Column({ nullable: false })
        public departmentId: string;
}