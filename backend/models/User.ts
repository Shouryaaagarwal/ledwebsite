// import mongoose, { Document, Model, Schema, Types } from 'mongoose';
// import bcrypt from 'bcryptjs';

// export interface IUser extends Document {
//   _id: Types.ObjectId;
//   name: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password?: string;
//   role: 'client' | 'creator';
//   emailUpdates: boolean;
//   emailVerified: Date | null;
//   emailToken: string;
//   image?: string;
//   createdAt: Date;
//   updatedAt: Date;
  
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// // Interface for the transformed JSON output
// interface IUserJSON {
//   id: string;
//   name: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: 'client' | 'creator';
//   emailUpdates: boolean;
//   emailVerified: Date | null;
//   image?: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// const userSchema: Schema<IUser> = new Schema(
//   {
//     name: { 
//       type: String, 
//       required: [true, 'Name is required'] 
//     },
//     firstName: { 
//       type: String, 
//       required: [true, 'First name is required'] 
//     },
//     lastName: { 
//       type: String, 
//       required: [true, 'Last name is required'] 
//     },
//     email: { 
//       type: String, 
//       required: [true, 'Email is required'],
//       unique: true, // This automatically creates an index
//       lowercase: true,
//       trim: true
//     },
//     password: { 
//       type: String,
//       minlength: [8, 'Password must be at least 8 characters']
//     },
//     role: { 
//       type: String, 
//       enum: ['client', 'creator'], 
//       required: [true, 'Role is required'] 
//     },
//     emailUpdates: { 
//       type: Boolean, 
//       default: false 
//     },
//     emailVerified: { 
//       type: Date, 
//       default: null 
//     },
//     emailToken: { 
//       type: String, 
//       required: true 
//     },
//     image: { 
//       type: String 
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       transform: function(doc, ret: Record<string, any>): IUserJSON {
//         return {
//           id: ret._id.toString(),
//           name: ret.name,
//           firstName: ret.firstName,
//           lastName: ret.lastName,
//           email: ret.email,
//           role: ret.role,
//           emailUpdates: ret.emailUpdates,
//           emailVerified: ret.emailVerified,
//           image: ret.image,
//           createdAt: ret.createdAt,
//           updatedAt: ret.updatedAt,
//         };
//       }
//     }
//   }
// );

// // Remove the duplicate email index - keep only the emailToken index
// // userSchema.index({ email: 1 }); // REMOVE THIS LINE - it's duplicate
// userSchema.index({ emailToken: 1 });

// // Pre-save middleware to hash password
// userSchema.pre<IUser>('save', async function(next) {
//   if (!this.isModified('password') || !this.password) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(12);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error: any) {
//     next(error);
//   }
// });

// // Method to compare password
// userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
//   if (!this.password) return false;
//   return bcrypt.compare(candidatePassword, this.password);
// };

// // Static method to find user by email
// userSchema.statics.findByEmail = function(email: string) {
//   return this.findOne({ email: email.toLowerCase() });
// };

// // Virtual for formatted id
// userSchema.virtual('id').get(function(this: IUser) {
//   return this._id.toString();
// });

// export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);  

import mongoose, { Document, Model, Schema, Types } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: 'client' | 'creator';
  emailUpdates: boolean;
  emailVerified: Date | null;
  emailToken: string;
  resetToken?: string;
  resetTokenExpiry?: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  
  comparePassword(candidatePassword: string): Promise<boolean>;
}

interface IUserJSON {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'client' | 'creator';
  emailUpdates: boolean;
  emailVerified: Date | null;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'] 
    },
    firstName: { 
      type: String, 
      required: [true, 'First name is required'] 
    },
    lastName: { 
      type: String, 
      required: [true, 'Last name is required'] 
    },
    email: { 
      type: String, 
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { 
      type: String,
      minlength: [8, 'Password must be at least 8 characters']
    },
    role: { 
      type: String, 
      enum: ['client', 'creator'], 
      required: [true, 'Role is required'] 
    },
    emailUpdates: { 
      type: Boolean, 
      default: false 
    },
    emailVerified: { 
      type: Date, 
      default: null 
    },
    emailToken: { 
      type: String, 
      // ✅ FIXED: Removed required: true and added default
      default: ''
    },
    resetToken: { 
      type: String 
    },
    resetTokenExpiry: { 
      type: Date 
    },
    image: { 
      type: String 
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function(doc, ret: Record<string, any>): IUserJSON {
        return {
          id: ret._id.toString(),
          name: ret.name,
          firstName: ret.firstName,
          lastName: ret.lastName,
          email: ret.email,
          role: ret.role,
          emailUpdates: ret.emailUpdates,
          emailVerified: ret.emailVerified,
          image: ret.image,
          createdAt: ret.createdAt,
          updatedAt: ret.updatedAt,
        };
      }
    }
  }
);

// ✅ Keep these indexes
userSchema.index({ emailToken: 1 });
userSchema.index({ resetToken: 1 });

// Pre-save middleware to hash password
userSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password') || !this.password) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find user by reset token (for password reset)
userSchema.statics.findByResetToken = function(token: string) {
  return this.findOne({ 
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() }
  });
};

// Static method to find user by email token (for email verification)
userSchema.statics.findByEmailToken = function(token: string) {
  return this.findOne({ emailToken: token });
};

// Method to set password reset token
userSchema.methods.setPasswordResetToken = function() {
  const crypto = require('crypto');
  this.resetToken = crypto.randomBytes(32).toString('hex');
  this.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);
  return this.resetToken;
};

// Method to clear password reset token
userSchema.methods.clearPasswordResetToken = function() {
  this.resetToken = undefined;
  this.resetTokenExpiry = undefined;
  return this;
};

// Method to verify email
userSchema.methods.verifyEmail = function() {
  this.emailVerified = new Date();
  this.emailToken = undefined;
  return this;
};

// Virtual for formatted id
userSchema.virtual('id').get(function(this: IUser) {
  return this._id.toString();
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);