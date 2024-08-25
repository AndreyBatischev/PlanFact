import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { PlanFact } from '../entities/PlanFact';

export class PlanFactController {
    private planFactRepository = AppDataSource.getRepository(PlanFact);

    async create(req: Request, res: Response): Promise<void> {
        try {

            const planFact = this.planFactRepository.create(req.body);
            const result = await this.planFactRepository.save(planFact);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Error creating', error });
        }
    }

    async getGroupedData(req: Request, res: Response): Promise<void> {
        try {
            const { startDate, endDate, object, workType } = req.query;

            const queryBuilder = this.planFactRepository.createQueryBuilder('plan_fact');

            if (startDate && endDate) {
                queryBuilder.andWhere('plan_fact.date BETWEEN :startDate AND :endDate', { startDate, endDate });
            }

            if (object) {
                queryBuilder.andWhere('plan_fact.object = :object', { object });
            }

            if (workType) {
                queryBuilder.andWhere('plan_fact.workType = :workType', { workType });
            }

            const groupedData = await queryBuilder
                .select("TO_CHAR(DATE_TRUNC('month', plan_fact.date), 'YYYY-MM') AS month")
                .addSelect('plan_fact.object', 'object')
                .addSelect('plan_fact.workType', 'workType')
                .addSelect('SUM(plan_fact.planAmount)', 'totalPlanAmount')
                .addSelect('SUM(plan_fact.factAmount)', 'totalFactAmount')
                .groupBy("TO_CHAR(DATE_TRUNC('month', plan_fact.date), 'YYYY-MM')")
                .addGroupBy('plan_fact.object')
                .addGroupBy('plan_fact.workType')
                .orderBy("TO_CHAR(DATE_TRUNC('month', plan_fact.date), 'YYYY-MM')")
                .getRawMany();

            let cumulativePlanAmount = 0;
            let cumulativeFactAmount = 0;
            const cumulativeData = groupedData.map((row) => {
                cumulativePlanAmount += parseFloat(row.totalPlanAmount);
                cumulativeFactAmount += parseFloat(row.totalFactAmount);
                return {
                    month: row.month,
                    object: row.object,
                    workType: row.workType,
                    cumulativePlanAmount,
                    cumulativeFactAmount,
                };
            });

            res.json({ cumulativeData, groupedData });
        } catch (error) {
            console.error('Error fetching grouped data:', error);
            res.status(500).json({ message: 'Error fetching grouped data', error });
        }
    }

}
