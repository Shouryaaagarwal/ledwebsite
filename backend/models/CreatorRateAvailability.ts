import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Rate & Availability Interface
export interface IRateAvailability extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  pricingType: 'hourly' | 'project';
  hourlyRate?: number;
  minimumBudget?: number;
  weeklyAvailability: '10' | '20' | '30' | '40' | 'more';
  availabilityStatus: 'active' | 'away';
  workWithInternational: boolean;
  currency: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Main Schema
const rateAvailabilitySchema = new Schema<IRateAvailability>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    pricingType: {
      type: String,
      required: true,
      enum: ['hourly', 'project'],
      default: 'hourly'
    },
    hourlyRate: {
      type: Number,
      min: 0
    },
    minimumBudget: {
      type: Number,
      min: 0
    },
    weeklyAvailability: {
      type: String,
      required: true,
      enum: ['10', '20', '30', '40', 'more'],
      default: '20'
    },
    availabilityStatus: {
      type: String,
      required: true,
      enum: ['active', 'away'],
      default: 'active'
    },
    workWithInternational: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      required: true,
      default: '₹'
    },
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        const { _id, __v, ...rest } = ret;
        return {
          id: _id.toString(),
          ...rest
        };
      }
    }
  }
);

// Indexes
rateAvailabilitySchema.index({ 'hourlyRate': 1 });
rateAvailabilitySchema.index({ 'minimumBudget': 1 });
rateAvailabilitySchema.index({ 'availabilityStatus': 1 });

// Virtuals
rateAvailabilitySchema.virtual('formattedHourlyRate').get(function(this: IRateAvailability) {
  if (!this.hourlyRate) return null;
  return `${this.currency}${this.hourlyRate.toLocaleString()}/hour`;
});

rateAvailabilitySchema.virtual('formattedMinimumBudget').get(function(this: IRateAvailability) {
  if (!this.minimumBudget) return null;
  return `${this.currency}${this.minimumBudget.toLocaleString()}`;
});

rateAvailabilitySchema.virtual('availabilityDescription').get(function(this: IRateAvailability) {
  const descriptions = {
    '10': 'Part-time (1-2 days/week)',
    '20': 'Part-time (3-4 days/week)',
    '30': 'Nearly full-time',
    '40': 'Full-time',
    'more': 'Full-time+ (Overtime available)'
  };
  return descriptions[this.weeklyAvailability] || '';
});

// Methods
rateAvailabilitySchema.methods.updateRateAvailability = function(updateData: Partial<IRateAvailability>) {
  Object.assign(this, updateData);
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

rateAvailabilitySchema.methods.markAsCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

rateAvailabilitySchema.methods.setAvailabilityStatus = function(status: 'active' | 'away') {
  this.availabilityStatus = status;
  return this.save();
};

// Static methods
rateAvailabilitySchema.statics.findByUserId = function(userId: string | Types.ObjectId) {
  return this.findOne({ userId });
};

rateAvailabilitySchema.statics.findActiveCreators = function() {
  return this.find({ availabilityStatus: 'active', completed: true });
};

rateAvailabilitySchema.statics.findByPriceRange = function(minPrice: number, maxPrice: number, pricingType: 'hourly' | 'project') {
  const priceField = pricingType === 'hourly' ? 'hourlyRate' : 'minimumBudget';
  return this.find({
    [priceField]: { $gte: minPrice, $lte: maxPrice },
    pricingType,
    availabilityStatus: 'active',
    completed: true
  });
};

export const CreatorRateAvailability: Model<IRateAvailability> = 
  mongoose.models.CreatorRateAvailability || 
  mongoose.model<IRateAvailability>('CreatorRateAvailability', rateAvailabilitySchema);