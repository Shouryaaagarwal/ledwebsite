import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IReferenceFile {
  url: string;
  name: string;
  fileType: string;
  size?: number;
  uploadedAt: Date;
}

export interface IPricingBlock {
  clientAskedPrice: number;
  yourPrice: number;
  reason?: string;
  accepted: boolean;
  status: 'counter_sent' | 'accepted' | 'rejected' | 'pending';
  counterSentAt?: Date;
  acceptedAt?: Date;
}

export interface IProjectRequest extends Document {
  _id: Types.ObjectId;
  creatorId: Types.ObjectId;
  projectTitle: string;
  projectType: string;
  receivedTime: Date;
  projectDescription: string;
  deadline: Date;
  referenceFiles: IReferenceFile[];
  pricingBlock: IPricingBlock;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected' | 'completed';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Reference File Schema
const referenceFileSchema = new Schema<IReferenceFile>({
  url: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  fileType: { 
    type: String, 
    required: true 
  },
  size: { 
    type: Number 
  },
  uploadedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Pricing Block Schema
const pricingBlockSchema = new Schema<IPricingBlock>({
  clientAskedPrice: { 
    type: Number, 
    required: true,
    min: 0 
  },
  yourPrice: { 
    type: Number, 
    required: true,
    min: 0 
  },
  reason: { 
    type: String, 
    trim: true 
  },
  accepted: { 
    type: Boolean, 
    default: false 
  },
  status: { 
    type: String, 
    enum: ['counter_sent', 'accepted', 'rejected', 'pending'],
    default: 'pending'
  },
  counterSentAt: Date,
  acceptedAt: Date
});

// Project Request Schema
const projectRequestSchema = new Schema<IProjectRequest>(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    projectTitle: {
      type: String,
      required: true,
      trim: true
    },
    projectType: {
      type: String,
      required: true,
      trim: true
    },
    receivedTime: {
      type: Date,
      default: Date.now
    },
    projectDescription: {
      type: String,
      required: true,
      trim: true
    },
    deadline: {
      type: Date,
      required: true
    },
    referenceFiles: [referenceFileSchema],
    pricingBlock: pricingBlockSchema,
    status: {
      type: String,
      enum: ['pending', 'under_review', 'accepted', 'rejected', 'completed'],
      default: 'pending'
    },
    isActive: {
      type: Boolean,
      default: true
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

// Virtual for days remaining
projectRequestSchema.virtual('daysRemaining').get(function(this: IProjectRequest) {
  const now = new Date();
  const deadline = new Date(this.deadline);
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Virtual for isOverdue
projectRequestSchema.virtual('isOverdue').get(function(this: IProjectRequest) {
  const now = new Date();
  const deadline = new Date(this.deadline);
  return now > deadline && this.status !== 'completed';
});

// Method to update pricing
projectRequestSchema.methods.updatePricing = function(yourPrice: number, reason?: string) {
  this.pricingBlock.yourPrice = yourPrice;
  if (reason) {
    this.pricingBlock.reason = reason;
  }
  this.pricingBlock.status = 'counter_sent';
  this.pricingBlock.counterSentAt = new Date();
  this.status = 'under_review';
  return this.save();
};

// Method to accept project
projectRequestSchema.methods.acceptProject = function() {
  this.pricingBlock.accepted = true;
  this.pricingBlock.status = 'accepted';
  this.pricingBlock.acceptedAt = new Date();
  this.status = 'accepted';
  return this.save();
};

// Method to reject project
projectRequestSchema.methods.rejectProject = function() {
  this.pricingBlock.status = 'rejected';
  this.status = 'rejected';
  this.isActive = false;
  return this.save();
};

// Method to complete project
projectRequestSchema.methods.completeProject = function() {
  this.status = 'completed';
  return this.save();
};

export const ProjectRequest: Model<IProjectRequest> = 
  mongoose.models.ProjectRequest || 
  mongoose.model<IProjectRequest>('ProjectRequest', projectRequestSchema);