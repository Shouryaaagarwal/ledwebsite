import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Work Experience Interface
export interface IWorkExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  country: string;
  currentlyWorking: boolean;
  startDate: string;
  endDate: string;
  description: string;
  workLetterUrl?: string;
  workLetterName?: string;
  completed: boolean;
  completedAt?: Date;
}

export interface ICreatorWorkExperience extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  workExperiences: IWorkExperience[];
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Work Experience Schema
const workExperienceSchema = new Schema<IWorkExperience>({
  id: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  company: { 
    type: String, 
    required: true, 
    trim: true 
  },
  location: { 
    type: String, 
    default: '' 
  },
  country: { 
    type: String, 
    default: '' 
  },
  currentlyWorking: { 
    type: Boolean, 
    default: false 
  },
  startDate: { 
    type: String, 
    required: true 
  },
  endDate: { 
    type: String, 
    default: '' 
  },
  description: { 
    type: String, 
    default: '' 
  },
  workLetterUrl: { 
    type: String 
  },
  workLetterName: { 
    type: String 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  completedAt: { 
    type: Date 
  }
});

// Main Schema
const creatorWorkExperienceSchema = new Schema<ICreatorWorkExperience>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true // This automatically creates an index
    },
    workExperiences: [workExperienceSchema],
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

// Remove the duplicate userId index - it's already created by unique: true
// Only keep indexes that are NOT automatically created
creatorWorkExperienceSchema.index({ 'workExperiences.company': 1 });
creatorWorkExperienceSchema.index({ 'workExperiences.title': 1 });

// Virtuals
creatorWorkExperienceSchema.virtual('experienceCount').get(function(this: ICreatorWorkExperience) {
  return this.workExperiences?.length || 0;
});

creatorWorkExperienceSchema.virtual('currentPositions').get(function(this: ICreatorWorkExperience) {
  return this.workExperiences?.filter(exp => exp.currentlyWorking) || [];
});

// Methods
creatorWorkExperienceSchema.methods.addWorkExperience = function(workExperienceData: Omit<IWorkExperience, 'id'>) {
  const newExperience: IWorkExperience = {
    id: Date.now().toString(),
    ...workExperienceData
  };
  
  this.workExperiences.push(newExperience);
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

creatorWorkExperienceSchema.methods.updateWorkExperience = function(experienceId: string, updateData: Partial<IWorkExperience>) {
  const experience = this.workExperiences.id(experienceId);
  if (experience) {
    Object.assign(experience, updateData);
    this.completed = true;
    this.completedAt = new Date();
  }
  return this.save();
};

creatorWorkExperienceSchema.methods.removeWorkExperience = function(experienceId: string) {
  this.workExperiences = this.workExperiences.filter((exp: IWorkExperience) => exp.id !== experienceId);
  this.completed = this.workExperiences.length > 0;
  return this.save();
};

creatorWorkExperienceSchema.methods.markAsCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Static methods
creatorWorkExperienceSchema.statics.findByUserId = function(userId: string | Types.ObjectId) {
  return this.findOne({ userId });
};

creatorWorkExperienceSchema.statics.findCompletedProfiles = function() {
  return this.find({ completed: true });
};

export const CreatorWorkExperience: Model<ICreatorWorkExperience> = 
  mongoose.models.CreatorWorkExperience || 
  mongoose.model<ICreatorWorkExperience>('CreatorWorkExperience', creatorWorkExperienceSchema);