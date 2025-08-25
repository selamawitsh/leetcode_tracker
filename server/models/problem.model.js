import mongoose from 'mongoose';

const AttemptSchema = new mongoose.Schema(
{
    attemptNumber: { type: Number, required: true },
    date: { type: Date, required: true },
    timeToFirstACMin: { type: Number, default: null },
    hintsUsed: { type: Number, default: 0 },
    result: { type: String, enum: ['AC', 'WA', 'TLE', 'RE', 'PARTIAL'], default: 'AC' },
    mistakes: { type: String, default: '' },
    keyIdea: { type: String, default: '' },
    approach: { type: String, default: '' },
    timeComplexity: { type: String, default: '' },
    spaceComplexity: { type: String, default: '' }
    },
    { _id: false }
);

const problemSchema = mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    pattern: { type: String, index: true },
    difficulty: { type: String, enum: ['E', 'M', 'H'], default: 'E', index: true },
    notes: { type: String, default: '' },
    nextReviewDate: { type: Date, index: true },
    attempts: { type: [AttemptSchema], default: [] }
    },
    { timestamps: true }
)

const Problem = mongoose.model('Problem', problemSchema);
export default Problem;