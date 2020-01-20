import mongoose from 'mongoose';
import timestampTz from './hooks/timestampsTz';

const MailAddresSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    number: {
      type: String,
      trim: true,
    },
    complement: {
      type: String,
      trim: true,
    },
    neighbourhood: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zip_code: {
      type: String,
      required: true,
      trim: true,
    },
    reference: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

MailAddresSchema.plugin(timestampTz, {
  createdAtName: 'created_at',
  updatedAtName: 'updated_at',
});

export default mongoose.model('MailAddress', MailAddresSchema, 'mail_address');
