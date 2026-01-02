import mongoose, { Document, Model, Schema, Types } from 'mongoose';

// Portfolio File Interface
export interface IPortfolioFile {
  url: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

// Portfolio Item Interface
export interface IPortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  externalLink?: string;
  files?: IPortfolioFile[];
  completed: boolean;
  completedAt?: Date;
}

// Portfolio Showcase Interface
export interface ICreatorPortfolioShowcase extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  portfolioItems: IPortfolioItem[];
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Portfolio File Schema
const portfolioFileSchema = new Schema<IPortfolioFile>({
  url: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  size: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: String, 
    required: true,
    enum: ['video', 'image', 'zip', 'other'] 
  },
  uploadedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Portfolio Item Schema
const portfolioItemSchema = new Schema<IPortfolioItem>({
  id: { 
    type: String, 
    required: true 
  },
  title: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true, 
    trim: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  externalLink: { 
    type: String, 
    default: '' 
  },
  files: { 
    type: [portfolioFileSchema], 
    default: [] 
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  completedAt: Date
});

// Portfolio Showcase Schema
const creatorPortfolioShowcaseSchema = new Schema<ICreatorPortfolioShowcase>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    portfolioItems: [portfolioItemSchema],
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

// Virtual for portfolio item count
creatorPortfolioShowcaseSchema.virtual('itemCount').get(function(this: ICreatorPortfolioShowcase) {
  return this.portfolioItems.length;
});

// Virtual for total file count
creatorPortfolioShowcaseSchema.virtual('totalFiles').get(function(this: ICreatorPortfolioShowcase) {
  return this.portfolioItems.reduce((total: number, item: IPortfolioItem) => total + (item.files?.length || 0), 0);
});

// Virtual for categories used
creatorPortfolioShowcaseSchema.virtual('categories').get(function(this: ICreatorPortfolioShowcase) {
  return [...new Set(this.portfolioItems.map((item: IPortfolioItem) => item.category))];
});

// Method to mark as completed
creatorPortfolioShowcaseSchema.methods.markAsCompleted = function() {
  this.completed = true;
  this.completedAt = new Date();
  return this.save();
};

// Method to add portfolio item
creatorPortfolioShowcaseSchema.methods.addPortfolioItem = function(portfolioItem: IPortfolioItem) {
  this.portfolioItems.push(portfolioItem);
  if (this.portfolioItems.length > 0) {
    this.completed = true;
    this.completedAt = new Date();
  }
  return this.save();
};

// Method to remove portfolio item
creatorPortfolioShowcaseSchema.methods.removePortfolioItem = function(itemId: string) {
  this.portfolioItems = this.portfolioItems.filter((item: IPortfolioItem) => item.id !== itemId);
  return this.save();
};

// Method to update portfolio item
creatorPortfolioShowcaseSchema.methods.updatePortfolioItem = function(itemId: string, updates: Partial<IPortfolioItem>) {
  const itemIndex = this.portfolioItems.findIndex((item: IPortfolioItem) => item.id === itemId);
  if (itemIndex !== -1) {
    this.portfolioItems[itemIndex] = { ...this.portfolioItems[itemIndex], ...updates };
  }
  return this.save();
};

// Method to update portfolio showcase
creatorPortfolioShowcaseSchema.methods.updatePortfolioShowcase = function(portfolioData: { portfolioItems: IPortfolioItem[] }) {
  this.portfolioItems = portfolioData.portfolioItems;
  if (portfolioData.portfolioItems.length > 0) {
    this.completed = true;
    this.completedAt = new Date();
  }
  return this.save();
};

export const CreatorPortfolioShowcase: Model<ICreatorPortfolioShowcase> = 
  mongoose.models.CreatorPortfolioShowcase || 
  mongoose.model<ICreatorPortfolioShowcase>('CreatorPortfolioShowcase', creatorPortfolioShowcaseSchema);