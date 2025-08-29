const { Schema, model } = require("mongoose")

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        delete ret.__v
        return ret
      },
    },
  }
)

const Note = model("Note", noteSchema)

module.exports = Note
