import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Professional Background Interface
export interface ICreatorProfessionalBackground extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  professionalTitle: string;
  bio: string;
  resumeUrl?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'expert';
  yearsOfExperience: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Professional Background Schema
const creatorProfessionalBackgroundSchema = new Schema<ICreatorProfessionalBackground>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    professionalTitle: { 
      type: String, 
      required: true, 
      trim: true 
    },
    bio: { 
      type: String, 
      required: true, 
      trim: true 
    },
    resumeUrl: String,
    experienceLevel: { 
      type: String, 
      required: true, 
      enum: ['beginner', 'intermediate', 'expert'] 
    },
    yearsOfExperience: { 
      type: String, 
      required: true, 
      enum: ['0-1', '1-3', '3-5', '5-7', '7-10', '10+'] 
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

// Virtual for formatted experience
creatorProfessionalBackgroundSchema.virtual('formattedExperience').get(function(this: ICreatorProfessionalBackground) {
  const experienceMap: { [key: string]: string } = {
    '0-1': '0-1 years',
    '1-3': '1-3 years',
    '3-5': '3-5 years',
    '5-7': '5-7 years',
    '7-10': '7-10 years',
    '10+': '10+ years'
  };
  return experienceMap[this.yearsOfExperience] || this.yearsOfExperience;
});

// Virtual for formatted level
creatorProfessionalBackgroundSchema.virtual('formattedLevel').get(function(this: ICreatorProfessionalBackground) {
  const levelMap: { [key: string]: string } = {
    'beginner': 'Beginner',
    'intermediate': 'Intermediate',
    'expert': 'Expert'
  };
  return levelMap[this.experienceLevel] || this.experienceLevel;
});

// Method to mark as completed
creatorProfessionalBackgroundSchema.methods.markAsCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Method to update professional background
creatorProfessionalBackgroundSchema.methods.updateProfessionalBackground = function(professionalData: Partial<ICreatorProfessionalBackground>) {
  Object.assign(this, professionalData);
  if (Object.keys(professionalData).length > 0) {
    this.completed = true;
    this.completedAt = new Date();
  }
  return this.save();
};

export const CreatorProfessionalBackground: Model<ICreatorProfessionalBackground> = 
  mongoose.models.CreatorProfessionalBackground || 
  mongoose.model<ICreatorProfessionalBackground>('CreatorProfessionalBackground', creatorProfessionalBackgroundSchema);