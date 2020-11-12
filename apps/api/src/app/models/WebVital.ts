import { Document, Model, model, Schema } from 'mongoose';
import { WebVitalPayload } from '@perf-analytics/api-interfaces';

export type IWebVital = WebVitalPayload & Document;

export interface IWebVitalModel extends Model<IWebVital> {
  createdAt: number;
}

const schema = new Schema({
  type: { type: String, required: true },
  startTime: { type: Number, required: true },
  name: { type: String },
  transferSize: { type: Number },
  initiatorType: { type: String },
  encodedBodySize: { type: Number },
  elementId: { type: String },
  elementClasses: { type: String },
  elementTagName: { type: String },
  duration: { type: Number },
  decodedBodySize: { type: Number },
  createdAt: { type: Number, required: true },
  shortCode: { type: String, required: true },
});

const WebVital: IWebVitalModel = model<IWebVital, IWebVitalModel>('WebVital', schema);

export default WebVital;
