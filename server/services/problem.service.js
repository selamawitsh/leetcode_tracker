import ProblemModel from '../models/problem.model.js';
import { addDays } from '../utils/date.js';


export async function createProblem(data) {
const problem = await ProblemModel.create(data);
return problem;
}


export async function listProblems(query = {}) {
    const { pattern, difficulty, due } = query;
    const filter = {};
    if (pattern) filter.pattern = pattern;
    if (difficulty) filter.difficulty = difficulty;
    if (due === 'today') {
    filter.nextReviewDate = { $lte: new Date() };
    }
    return ProblemModel.find(filter).sort({ updatedAt: -1 });
}


export async function getProblem(id) {
return ProblemModel.findById(id);
}


export async function updateProblem(id, updates) {
return ProblemModel.findByIdAndUpdate(id, updates, { new: true });
}


export async function deleteProblem(id) {
return ProblemModel.findByIdAndDelete(id);
}


export async function addAttempt(id, attempt) {
const problem = await ProblemModel.findById(id);
if (!problem) throw new Error('Problem not found');


// auto-increment attempt number if not provided
const nextAttemptNumber = (problem.attempts.at(-1)?.attemptNumber || 0) + 1;
const payload = {
    attemptNumber: attempt.attemptNumber ?? nextAttemptNumber,
    date: attempt.date ? new Date(attempt.date) : new Date(),
    result: attempt.result ?? 'AC'
};

problem.attempts.push(payload);


// spaced repetition schedule based on attempt count
const n = payload.attemptNumber;
if (n === 1) problem.nextReviewDate = addDays(new Date(), 1);
else if (n === 2) problem.nextReviewDate = addDays(new Date(), 7);
else if (n >= 3) problem.nextReviewDate = addDays(new Date(), 30);


await problem.save();
return problem;
}

export async function dueToday() {
    const today = new Date();
    return ProblemModel.find({ nextReviewDate: { $lte: today } }).sort({ nextReviewDate: 1 });
}
