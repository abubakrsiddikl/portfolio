import { Schema, model } from "mongoose";
import { IProject } from "./project.interface";

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    projectImages: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    githubFrontend: {
      type: String,
      default: "",
    },
    githubBackend: {
      type: String,
      default: "",
    },
    liveLink: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "General",
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// create slug
projectSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    const baseSlug = this.title.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}`;

    let counter = 0;
    while (await Project.exists({ slug })) {
      slug = `${slug}-${counter++}`; //  counter to ensure uniqueness
    }

    this.slug = slug;
  }
  next();
});
// update slug
projectSchema.pre("findOneAndUpdate", async function (next) {
  const project = this.getUpdate() as Partial<IProject>;

  if (project.title) {
    const baseSlug = project.title.toLowerCase().split(" ").join("-");
    let slug = `${baseSlug}`;

    let counter = 0;
    while (await Project.exists({ slug })) {
      slug = `${slug}-${counter++}`; //  counter to ensure uniqueness
    }

    project.slug = slug;
  }

  this.setUpdate(project);

  next();
});

export const Project = model<IProject>("Project", projectSchema);
