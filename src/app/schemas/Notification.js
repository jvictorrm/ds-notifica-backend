import mongoose from 'mongoose';
import timestampTz from './hooks/timestampsTz';

const AutoIncrement = require('mongoose-sequence')(mongoose);

const NotificationSchema = new mongoose.Schema(
  {
    sequence: {
      type: Number,
    },
    year: {
      type: Number,
      required: true,
      default: new Date().getFullYear(),
    },
    furniture_registration: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    cpf_cnpj: {
      type: String,
      trim: true,
    },
    process_number: {
      type: String,
      trim: true,
    },
    corporate_name: {
      type: String,
      trim: true,
    },
    business_branch: {
      type: String,
      trim: true,
    },
    legal_foundation: {
      type: String,
      trim: true,
    },
    shipping_type: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    canceled: {
      type: Boolean,
      default: false,
    },
    mail_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MailAddress',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    second_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

NotificationSchema.plugin(AutoIncrement, {
  collection_name: 'notific_seq',
  inc_field: 'sequence',
  id: 'seq_id',
  reference_fields: 'year',
});

NotificationSchema.plugin(timestampTz, {
  createdAtName: 'created_at',
  updatedAtName: 'updated_at',
});

export default mongoose.model('Notification', NotificationSchema);
