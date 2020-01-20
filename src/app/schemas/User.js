import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import timestampTz from './hooks/timestampsTz';

const UserSchema = new mongoose.Schema(
  {
    registry: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// encrypt password before save user
UserSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// encrypt password before update user
UserSchema.pre(['updateOne', 'findOneAndUpdate'], async function(next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 8);
  }

  next();
});

// Search for a user by username and password.
UserSchema.statics.findByCredentials = async (registry, password) => {
  const user = await User.findOne({ registry });
  if (!user) {
    return null;
  }

  if (!(await user.checkPassword(password))) {
    return null;
  }

  return user;
};

UserSchema.methods.checkPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.plugin(timestampTz, {
  createdAtName: 'created_at',
  updatedAtName: 'updated_at',
});

const User = mongoose.model('User', UserSchema);
export default User;
