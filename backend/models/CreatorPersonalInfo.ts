import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Personal Information Interface
export interface ICreatorPersonalInfo extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  fullName: string;
  dateOfBirth: Date;
  gender?: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
  profilePhoto?: string;
  city: string;
  country: string;
  timeZone: string;
  spokenLanguages: string[];
  personalStatement: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Personal Info Schema
const creatorPersonalInfoSchema = new Schema<ICreatorPersonalInfo>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    fullName: { 
      type: String, 
      required: true, 
      trim: true 
    },
    dateOfBirth: { 
      type: Date, 
      required: true 
    },
    gender: { 
      type: String, 
      enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'] 
    },
    profilePhoto: String,
    city: { 
      type: String, 
      required: true, 
      trim: true 
    },
    country: { 
      type: String, 
      required: true, 
      trim: true 
    },
    timeZone: { 
      type: String, 
      required: true,
      default: 'Asia/Kolkata'
    },
    spokenLanguages: [{ 
      type: String, 
      required: true 
    }],
    personalStatement: { 
      type: String, 
      required: true, 
      trim: true 
    },
    completed: { 
      type: Boolean, 
      default: false 
    },
    completedAt: Date
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

// Virtual for age calculation
creatorPersonalInfoSchema.virtual('age').get(function(this: ICreatorPersonalInfo) {
  if (!this.dateOfBirth) return null;
  
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
});

// Virtual for location
creatorPersonalInfoSchema.virtual('location').get(function(this: ICreatorPersonalInfo) {
  if (!this.city || !this.country) return '';
  return `${this.city}, ${this.country}`;
});

// Method to mark as completed
creatorPersonalInfoSchema.methods.markAsCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Method to update personal info
creatorPersonalInfoSchema.methods.updatePersonalInfo = function(personalInfoData: Partial<ICreatorPersonalInfo>) {
  Object.assign(this, personalInfoData);
  if (Object.keys(personalInfoData).length > 0) {
    this.completed = true;
    this.completedAt = new Date();
  }
  return this.save();
};

export const CreatorPersonalInfo: Model<ICreatorPersonalInfo> = 
  mongoose.models.CreatorPersonalInfo || 
  mongoose.model<ICreatorPersonalInfo>('CreatorPersonalInfo', creatorPersonalInfoSchema);