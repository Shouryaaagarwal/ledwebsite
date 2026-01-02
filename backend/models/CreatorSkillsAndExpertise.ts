import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Skill Interface
export interface ISkill {
  id: string;
  name: string;
  category: string;
}

// Skills and Expertise Interface
export interface ICreatorSkillsAndExpertise extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  skills: ISkill[];
  categories: string[];
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Skill Schema
const skillSchema = new Schema<ISkill>({
  id: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category: { 
    type: String, 
    required: true 
  }
});

// Skills and Expertise Schema
const creatorSkillsAndExpertiseSchema = new Schema<ICreatorSkillsAndExpertise>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    skills: [skillSchema],
    categories: [{ 
      type: String, 
      required: true 
    }],
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

// Virtual for skill count
creatorSkillsAndExpertiseSchema.virtual('skillCount').get(function(this: ICreatorSkillsAndExpertise) {
  return this.skills.length;
});

// Virtual for unique categories
creatorSkillsAndExpertiseSchema.virtual('uniqueCategories').get(function(this: ICreatorSkillsAndExpertise) {
  return [...new Set(this.skills.map((skill: ISkill) => skill.category))];
});

// Method to mark as completed
creatorSkillsAndExpertiseSchema.methods.markAsCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Method to add skill
creatorSkillsAndExpertiseSchema.methods.addSkill = function(skill: ISkill) {
  const exists = this.skills.some((s: ISkill) => s.id === skill.id || s.name.toLowerCase() === skill.name.toLowerCase());
  if (!exists) {
    this.skills.push(skill);
    // Update categories
    if (!this.categories.includes(skill.category)) {
      this.categories.push(skill.category);
    }
  }
  return this.save();
};

// Method to remove skill
creatorSkillsAndExpertiseSchema.methods.removeSkill = function(skillId: string) {
  const skillToRemove = this.skills.find((s: ISkill) => s.id === skillId);
  this.skills = this.skills.filter((s: ISkill) => s.id !== skillId);
  
  // Remove category if no skills left in that category
  if (skillToRemove) {
    const hasCategorySkills = this.skills.some((s: ISkill) => s.category === skillToRemove.category);
    if (!hasCategorySkills) {
      this.categories = this.categories.filter((c: string) => c !== skillToRemove.category);
    }
  }
  return this.save();
};

// Method to update skills and expertise
creatorSkillsAndExpertiseSchema.methods.updateSkillsAndExpertise = function(skillsData: { skills: ISkill[]; categories: string[] }) {
  this.skills = skillsData.skills;
  this.categories = skillsData.categories;
  if (skillsData.skills.length > 0) {
    this.completed = true;
    this.completedAt = new Date();
  }
  return this.save();
};

export const CreatorSkillsAndExpertise: Model<ICreatorSkillsAndExpertise> = 
  mongoose.models.CreatorSkillsAndExpertise || 
  mongoose.model<ICreatorSkillsAndExpertise>('CreatorSkillsAndExpertise', creatorSkillsAndExpertiseSchema);