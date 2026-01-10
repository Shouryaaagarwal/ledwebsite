// import nodemailer from 'nodemailer';

// // Create transporter
// const transporter = nodemailer.createTransporter({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// // Verify transporter configuration
// transporter.verify(function (error, success) {
//   if (error) {
//     console.error('Email transporter error:', error);
//   } else {
//     console.log('Email server is ready to take messages');
//   }
// });

// export async function sendVerificationEmail(email: string, token: string, firstName: string) {
//   const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-mail?token=${token}`;

//   const mailOptions = {
//     from: `"Hey Humanz" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Verify Your Email - Hey Humanz',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="color: #333; margin: 0;">Hey Humanz</h1>
//         </div>
        
//         <h2 style="color: #333;">Hello ${firstName}!</h2>
        
//         <p style="color: #666; line-height: 1.6;">
//           Thank you for signing up with Hey Humanz. To complete your registration, 
//           please verify your email address by clicking the button below:
//         </p>
        
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${verificationUrl}" 
//              style="background-color: #000; color: white; padding: 14px 28px; 
//                     text-decoration: none; border-radius: 5px; display: inline-block;
//                     font-weight: bold; font-size: 16px;">
//             Verify Email Address
//           </a>
//         </div>
        
//         <p style="color: #666; line-height: 1.6;">
//           If the button doesn't work, copy and paste the following link into your browser:
//         </p>
        
//         <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
//           <a href="${verificationUrl}" style="color: #007bff; text-decoration: none;">
//             ${verificationUrl}
//           </a>
//         </p>
        
//         <p style="color: #999; font-size: 12px; margin-top: 30px;">
//           This verification link will expire in 24 hours. If you didn't create an account with Hey Humanz, 
//           please ignore this email.
//         </p>
//       </div>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Verification email sent to:', email);
//     return true;
//   } catch (error) {
//     console.error('Error sending verification email:', error);
//     throw new Error('Failed to send verification email');
//   }
// }   


// import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';

// interface EmailConfig {
//   service: string;
//   auth: {
//     user: string | undefined;
//     pass: string | undefined;
//   };
// }

// // Validate environment variables
// if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
//   throw new Error('Email credentials are not configured in environment variables');
// }

// const emailConfig: EmailConfig = {
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// };

// // Create transporter
// const transporter: Transporter = nodemailer.createTransport(emailConfig);

// // Verify transporter configuration
// transporter.verify((error: Error | null) => {
//   if (error) {
//     console.error('Email transporter configuration error:', error);
//   } else {
//     console.log('Email server is ready to take messages');
//   }
// });

// export async function sendVerificationEmail(email: string, token: string, firstName: string): Promise<boolean> {
//   if (!process.env.NEXTAUTH_URL) {
//     throw new Error('NEXTAUTH_URL environment variable is not set');
//   }

//   const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-mail?token=${token}`;

//   const mailOptions = {
//     from: `"Hey Humanz" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Verify Your Email - Hey Humanz',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="color: #333; margin: 0;">Hey Humanz</h1>
//         </div>
        
//         <h2 style="color: #333;">Hello ${firstName}!</h2>
        
//         <p style="color: #666; line-height: 1.6;">
//           Thank you for signing up with Hey Humanz. To complete your registration, 
//           please verify your email address by clicking the button below:
//         </p>
        
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${verificationUrl}" 
//              style="background-color: #000; color: white; padding: 14px 28px; 
//                     text-decoration: none; border-radius: 5px; display: inline-block;
//                     font-weight: bold; font-size: 16px;">
//             Verify Email Address
//           </a>
//         </div>
        
//         <p style="color: #666; line-height: 1.6;">
//           If the button doesn't work, copy and paste the following link into your browser:
//         </p>
        
//         <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
//           <a href="${verificationUrl}" style="color: #007bff; text-decoration: none;">
//             ${verificationUrl}
//           </a>
//         </p>
        
//         <p style="color: #999; font-size: 12px; margin-top: 30px;">
//           This verification link will expire in 24 hours. If you didn't create an account with Hey Humanz, 
//           please ignore this email.
//         </p>
//       </div>
//     `,
//   };

//   try {
//     const info: SentMessageInfo = await transporter.sendMail(mailOptions);
//     console.log('Verification email sent to:', email, 'Message ID:', info.messageId);
//     return true;
//   } catch (error: unknown) {
//     console.error('Error sending verification email to', email, ':', error);
    
//     if (error instanceof Error) {
//       throw new Error(`Failed to send verification email: ${error.message}`);
//     } else {
//       throw new Error('Failed to send verification email: Unknown error occurred');
//     }
//   }
// }


// import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';

// interface EmailConfig {
//   service: string;
//   auth: {
//     user: string | undefined;
//     pass: string | undefined;
//   };
// }

// // Validate environment variables
// if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
//   throw new Error('Email credentials are not configured in environment variables');
// }

// const emailConfig: EmailConfig = {
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// };

// // Create transporter
// const transporter: Transporter = nodemailer.createTransport(emailConfig);

// // Verify transporter configuration
// transporter.verify((error: Error | null) => {
//   if (error) {
//     console.error('Email transporter configuration error:', error);
//   } else {
//     console.log('Email server is ready to take messages');
//   }
// });

// export async function sendVerificationEmail(email: string, token: string, firstName: string): Promise<boolean> {
//   if (!process.env.NEXTAUTH_URL) {
//     throw new Error('NEXTAUTH_URL environment variable is not set');
//   }

//   // CHANGED: Updated URL to point to the page instead of API
//   const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

//   const mailOptions = {
//     from: `"Hey Humanz" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Verify Your Email - Hey Humanz',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="color: #333; margin: 0;">Hey Humanz</h1>
//         </div>
        
//         <h2 style="color: #333;">Hello ${firstName}!</h2>
        
//         <p style="color: #666; line-height: 1.6;">
//           Thank you for signing up with Hey Humanz. To complete your registration, 
//           please verify your email address by clicking the button below:
//         </p>
        
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${verificationUrl}" 
//              style="background-color: #000; color: white; padding: 14px 28px; 
//                     text-decoration: none; border-radius: 5px; display: inline-block;
//                     font-weight: bold; font-size: 16px;">
//             Verify Email Address
//           </a>
//         </div>
        
//         <p style="color: #666; line-height: 1.6;">
//           If the button doesn't work, copy and paste the following link into your browser:
//         </p>
        
//         <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
//           <a href="${verificationUrl}" style="color: #007bff; text-decoration: none;">
//             ${verificationUrl}
//           </a>
//         </p>
        
//         <p style="color: #999; font-size: 12px; margin-top: 30px;">
//           This verification link will expire in 24 hours. If you didn't create an account with Hey Humanz, 
//           please ignore this email.
//         </p>
//       </div>
//     `,
//   };

//   try {
//     const info: SentMessageInfo = await transporter.sendMail(mailOptions);
//     console.log('Verification email sent to:', email, 'Message ID:', info.messageId);
//     return true;
//   } catch (error: unknown) {
//     console.error('Error sending verification email to', email, ':', error);
    
//     if (error instanceof Error) {
//       throw new Error(`Failed to send verification email: ${error.message}`);
//     } else {
//       throw new Error('Failed to send verification email: Unknown error occurred');
//     }
//   }
// }  




// import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';

// interface EmailConfig {
//   service: string;
//   auth: {
//     user: string | undefined;
//     pass: string | undefined;
//   };
// }

// // Validate environment variables
// if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
//   throw new Error('Email credentials are not configured in environment variables');
// }

// const emailConfig: EmailConfig = {
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// };

// // Create transporter
// const transporter: Transporter = nodemailer.createTransport(emailConfig);

// // Verify transporter configuration
// transporter.verify((error: Error | null) => {
//   if (error) {
//     console.error('Email transporter configuration error:', error);
//   } else {
//     console.log('Email server is ready to take messages');
//   }
// });

// export async function sendVerificationEmail(email: string, token: string, firstName: string): Promise<boolean> {
//   if (!process.env.NEXTAUTH_URL) {
//     throw new Error('NEXTAUTH_URL environment variable is not set');
//   }

//   const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

//   const mailOptions = {
//     from: `"Hey Humanz" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Verify Your Email - Hey Humanz',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="color: #333; margin: 0;">Hey Humanz</h1>
//         </div>
        
//         <h2 style="color: #333;">Hello ${firstName}!</h2>
        
//         <p style="color: #666; line-height: 1.6;">
//           Thank you for signing up with Hey Humanz. To complete your registration, 
//           please verify your email address by clicking the button below:
//         </p>
        
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${verificationUrl}" 
//              style="background-color: #000; color: white; padding: 14px 28px; 
//                     text-decoration: none; border-radius: 5px; display: inline-block;
//                     font-weight: bold; font-size: 16px;">
//             Verify Email Address
//           </a>
//         </div>
        
//         <p style="color: #666; line-height: 1.6;">
//           If the button doesn't work, copy and paste the following link into your browser:
//         </p>
        
//         <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
//           <a href="${verificationUrl}" style="color: #007bff; text-decoration: none;">
//             ${verificationUrl}
//           </a>
//         </p>
        
//         <p style="color: #999; font-size: 12px; margin-top: 30px;">
//           This verification link will expire in 24 hours. If you didn't create an account with Hey Humanz, 
//           please ignore this email.
//         </p>
//       </div>
//     `,
//   };

//   try {
//     const info: SentMessageInfo = await transporter.sendMail(mailOptions);
//     console.log('Verification email sent to:', email, 'Message ID:', info.messageId);
//     return true;
//   } catch (error: unknown) {
//     console.error('Error sending verification email to', email, ':', error);
    
//     if (error instanceof Error) {
//       throw new Error(`Failed to send verification email: ${error.message}`);
//     } else {
//       throw new Error('Failed to send verification email: Unknown error occurred');
//     }
//   }
// }

// // ADD THIS FUNCTION FOR PASSWORD RESET
// export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
//   if (!process.env.NEXTAUTH_URL) {
//     throw new Error('NEXTAUTH_URL environment variable is not set');
//   }

//   const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

//   const mailOptions = {
//     from: `"Hey Humanz" <${process.env.EMAIL_USER}>`,
//     to: email,
//     subject: 'Reset Your Password - Hey Humanz',
//     html: `
//       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//         <div style="text-align: center; margin-bottom: 30px;">
//           <h1 style="color: #333; margin: 0;">Hey Humanz</h1>
//         </div>
        
//         <h2 style="color: #333;">Reset Your Password</h2>
        
//         <p style="color: #666; line-height: 1.6;">
//           You requested to reset your password for your Hey Humanz account. 
//           Click the button below to create a new password:
//         </p>
        
//         <div style="text-align: center; margin: 30px 0;">
//           <a href="${resetUrl}" 
//              style="background-color: #000; color: white; padding: 14px 28px; 
//                     text-decoration: none; border-radius: 5px; display: inline-block;
//                     font-weight: bold; font-size: 16px;">
//             Reset Password
//           </a>
//         </div>
        
//         <p style="color: #666; line-height: 1.6;">
//           If the button doesn't work, copy and paste the following link into your browser:
//         </p>
        
//         <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
//           <a href="${resetUrl}" style="color: #007bff; text-decoration: none;">
//             ${resetUrl}
//           </a>
//         </p>
        
//         <p style="color: #999; font-size: 12px; margin-top: 30px;">
//           This password reset link will expire in 1 hour. If you didn't request a password reset, 
//           please ignore this email.
//         </p>
//       </div>
//     `,
//   };

//   try {
//     const info: SentMessageInfo = await transporter.sendMail(mailOptions);
//     console.log('Password reset email sent to:', email, 'Message ID:', info.messageId);
//     return true;
//   } catch (error: unknown) {
//     console.error('Error sending password reset email to', email, ':', error);
    
//     if (error instanceof Error) {
//       throw new Error(`Failed to send password reset email: ${error.message}`);
//     } else {
//       throw new Error('Failed to send password reset email: Unknown error occurred');
//     }
//   }
// }  



import nodemailer, { Transporter, SentMessageInfo } from 'nodemailer';

interface EmailConfig {
  service: string;
  auth: {
    user: string | undefined;
    pass: string | undefined;
  };
}

// Validate environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  throw new Error('Email credentials are not configured in environment variables');
}

const emailConfig: EmailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

// Create transporter
const transporter: Transporter = nodemailer.createTransport(emailConfig);

// Verify transporter configuration
transporter.verify((error: Error | null) => {
  if (error) {
    console.error('Email transporter configuration error:', error);
  } else {
    console.log('Email server is ready to take messages');
  }
});

export async function sendVerificationEmail(email: string, token: string, firstName: string): Promise<boolean> {
  if (!process.env.NEXTAUTH_URL) {
    throw new Error('NEXTAUTH_URL environment variable is not set');
  }

  // ✅ FIXED: Add /api/ to the verification URL
const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Hey Humanz" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Verify Your Email - Hey Humanz',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0;">Hey Humanz</h1>
        </div>
        
        <h2 style="color: #333;">Hello ${firstName}!</h2>
        
        <p style="color: #666; line-height: 1.6;">
          Thank you for signing up with Hey Humanz. To complete your registration, 
          please verify your email address by clicking the button below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #000; color: white; padding: 14px 28px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;
                    font-weight: bold; font-size: 16px;">
            Verify Email Address
          </a>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          If the button doesn't work, copy and paste the following link into your browser:
        </p>
        
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
          <a href="${verificationUrl}" style="color: #007bff; text-decoration: none;">
            ${verificationUrl}
          </a>
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This verification link will expire in 24 hours. If you didn't create an account with Hey Humanz, 
          please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log('Verification email sent to:', email, 'Message ID:', info.messageId);
    return true;
  } catch (error: unknown) {
    console.error('Error sending verification email to', email, ':', error);
    
    if (error instanceof Error) {
      throw new Error(`Failed to send verification email: ${error.message}`);
    } else {
      throw new Error('Failed to send verification email: Unknown error occurred');
    }
  }
}

// ADD THIS FUNCTION FOR PASSWORD RESET
export async function sendPasswordResetEmail(email: string, token: string): Promise<boolean> {
  if (!process.env.NEXTAUTH_URL) {
    throw new Error('NEXTAUTH_URL environment variable is not set');
  }

  // ✅ FIXED: Add /api/ to the reset URL too
const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Hey Humanz" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Reset Your Password - Hey Humanz',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #333; margin: 0;">Hey Humanz</h1>
        </div>
        
        <h2 style="color: #333;">Reset Your Password</h2>
        
        <p style="color: #666; line-height: 1.6;">
          You requested to reset your password for your Hey Humanz account. 
          Click the button below to create a new password:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #000; color: white; padding: 14px 28px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;
                    font-weight: bold; font-size: 16px;">
            Reset Password
          </a>
        </div>
        
        <p style="color: #666; line-height: 1.6;">
          If the button doesn't work, copy and paste the following link into your browser:
        </p>
        
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; word-break: break-all;">
          <a href="${verificationUrl}" style="color: #007bff; text-decoration: none;">
            ${verificationUrl}
          </a>
        </p>
        
        <p style="color: #999; font-size: 12px; margin-top: 30px;">
          This password reset link will expire in 1 hour. If you didn't request a password reset, 
          please ignore this email.
        </p>
      </div>
    `,
  };

  try {
    const info: SentMessageInfo = await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', email, 'Message ID:', info.messageId);
    return true;
  } catch (error: unknown) {
    console.error('Error sending password reset email to', email, ':', error);
    
    if (error instanceof Error) {
      throw new Error(`Failed to send password reset email: ${error.message}`);
    } else {
      throw new Error('Failed to send password reset email: Unknown error occurred');
    }
  }
}