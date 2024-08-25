import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePlanFactTable1724528388967 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "plan_fact",
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'uuid',
                    },
                    {
                        name: "object",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "work_type",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "date",
                        type: "date",
                        isNullable: false,
                    },
                    {
                        name: "plan_amount",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "fact_amount",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                ],
            }),
            true 
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("plan_fact", true);
    }
}
