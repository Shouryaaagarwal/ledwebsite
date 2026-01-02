import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Emergency Contact Interface
export interface IEmergencyContact {
  name: string;
  phoneNumber: string;
  relationship: 'parent' | 'spouse' | 'sibling' | 'friend' | 'relative' | 'other';
}

// Verification & Contact Interface
export interface ICreatorVerificationContact extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  phoneNumber: string;
  phoneVerified: boolean;
  phoneVerifiedAt?: Date;
  governmentIdUrl?: string;
  governmentIdName?: string;
  address: string;
  postalCode: string;
  emergencyContact: IEmergencyContact;
  agreedToTerms: boolean;
  agreedToTermsAt?: Date;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Emergency Contact Schema
const emergencyContactSchema = new Schema<IEmergencyContact>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  relationship: {
    type: String,
    required: true,
    enum: ['parent', 'spouse', 'sibling', 'friend', 'relative', 'other'],
    default: 'other'
  }
});

// Main Schema
const creatorVerificationContactSchema = new Schema<ICreatorVerificationContact>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },
    phoneVerified: {
      type: Boolean,
      default: false
    },
    phoneVerifiedAt: {
      type: Date
    },
    governmentIdUrl: {
      type: String
    },
    governmentIdName: {
      type: String
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    postalCode: {
      type: String,
      required: true,
      trim: true
    },
    emergencyContact: {
      type: emergencyContactSchema,
      required: true
    },
    agreedToTerms: {
      type: Boolean,
      required: true,
      default: false
    },
    agreedToTermsAt: {
      type: Date
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
creatorVerificationContactSchema.index({ phoneNumber: 1 });
creatorVerificationContactSchema.index({ phoneVerified: 1 });

// Virtuals
creatorVerificationContactSchema.virtual('isFullyVerified').get(function(this: ICreatorVerificationContact) {
  return this.phoneVerified && this.agreedToTerms;
});

// Methods
creatorVerificationContactSchema.methods.verifyPhone = function() {
  this.phoneVerified = true;
  this.phoneVerifiedAt = new Date();
  return this.save();
};

creatorVerificationContactSchema.methods.agreeToTerms = function() {
  this.agreedToTerms = true;
  this.agreedToTermsAt = new Date();
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

creatorVerificationContactSchema.methods.updateVerificationData = function(updateData: Partial<ICreatorVerificationContact>) {
  Object.assign(this, updateData);
  
  // Mark as completed if all required fields are filled
  if (this.phoneNumber && this.address && this.postalCode && 
      this.emergencyContact?.name && this.emergencyContact?.phoneNumber && 
      this.emergencyContact?.relationship && this.agreedToTerms) {
    this.completed = true;
    this.completedAt = new Date();
  }
  
  return this.save();
};

creatorVerificationContactSchema.methods.markAsCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Static methods
creatorVerificationContactSchema.statics.findByUserId = function(userId: string | Types.ObjectId) {
  return this.findOne({ userId });
};

creatorVerificationContactSchema.statics.findVerifiedCreators = function() {
  return this.find({ phoneVerified: true, agreedToTerms: true, completed: true });
};

export const CreatorVerificationContact: Model<ICreatorVerificationContact> = 
  mongoose.models.CreatorVerificationContact || 
  mongoose.model<ICreatorVerificationContact>('CreatorVerificationContact', creatorVerificationContactSchema);