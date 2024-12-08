const mongoose = require("mongoose");
const bcryptjs = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username wajib diisi"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Silakan masukkan email yang valid",
      ],
    },
    password: {
      type: String,
      required: [true, "Kata sandi wajib diisi"],
      minlength: [6, "Kata sandi minimal 6 karakter"],
    },
    phone: {
      type: String,
      required: [true, "Nomor telepon wajib diisi"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    address: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    likedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    isVerified: { type: Boolean, default: false },
    image: { type: String, default: "" },
  },

  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcryptjs.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcryptjs.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
