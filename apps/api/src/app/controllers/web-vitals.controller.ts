import { Request, Response } from 'express';
import WebVital, { IWebVitalModel } from '../models/WebVital';

const create = async (req: Request, res: Response) => {
  const vital = new WebVital({
    ...req.body,
    createdAt: new Date().valueOf(),
  } as IWebVitalModel);
  await vital.save();

  return res.send({
    message: 'Success',
    vital: vital.toJSON(),
  });
};

const fetchAll = async (req: Request, res: Response) => {
  const { startDate, endDate, type } = req.query;

  const filtered = startDate || endDate || type;

  if (!filtered) {
    return res.send({
      message: 'Success',
      vitals: await WebVital.find({}),
    });
  }

  const start = startDate ? new Date(+startDate) : null;
  const end = endDate ? new Date(+endDate) : null;

  const vitals = await WebVital.find({
    ...((start || end) && {
      createdAt: {
        ...(start && { $gte: start }),
        ...(end && { $lt: end }),
      },
    }),
    ...(type && { shortCode: type as string }),
  });

  return res.send({
    message: 'Success',
    vitals,
  });
};

export default {
  create,
  fetchAll,
};
