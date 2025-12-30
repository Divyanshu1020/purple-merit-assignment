import bcrypt from "bcrypt";
import { Document, InferSchemaType, Schema, model } from "mongoose";

// export interface IUser extends Document {
//   username: string;
//   email: string;
//   password: string;
//   role: "user" | "admin";
//   firstName?: string;
//   lastName?: string;
//   socialLinks?: {
//     facebook?: string;
//     twitter?: string;
//     linkedin?: string;
//     instagram?: string;
//   };
// }

const userSchema = new Schema(
  {
    // username: {
    //   type: String,
    //   required: [true, "Username is required"],
    //   maxLength: [20, "Username can't be more than 20 characters"],
    //   unique: [true, "Username already exists"],
    // },
    email: {
      type: String,
      required: [true, "Email is required"],
      maxLength: [100, "Email can't be more than 100 characters"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      //   required: [true, "Role is required"],
      enum: {
        values: ["user", "admin"],
        message: "Role can only be user or admin",
      },
      default: "user",
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      maxLength: [200, "Full name can't be more than 200 characters"],
    },
    status: {
      type: String,
      enum: {
        values: ["active", "inactive"],
        message: "Status can only be active or inactive",
      },
      default: "active",
    },
    loginTimestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
export type TUser = InferSchemaType<typeof userSchema> & {
  isPasswordCorrect: (password: string) => Promise<boolean>;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // next();
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel = model<TUser>("User", userSchema);

export default UserModel;
