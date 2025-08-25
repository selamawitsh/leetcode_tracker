import {Router} from 'express';
import * as ctrller from '../controllers/problem.controller.js';

const router= Router();



router.get('/', ctrller.listAllProblems); // list problems (optional filters: pattern, difficulty, due=today)
router.post('/', ctrller.createProblem); // create problem
router.get('/due/today', ctrller.getProblemsDueToday);// due today for review
router.get('/:id', ctrller.getProblemById); // get one
router.put('/:id', ctrller.updateProblemById); // update problem fields (title, pattern, nextReviewDate, notes...)
router.delete('/:id', ctrller.deleteProblemById); // delete problem
router.post('/:id/attempts', ctrller.addAttemptToProblem); // add attempt + auto schedule nextReviewDate


export default router;

