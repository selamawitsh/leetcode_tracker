import * as service from '../services/problem.service.js';

// Create a new problem
export async function createProblem(req, res) {
    try {
        const created = await service.createProblem(req.body);
        res.status(201).json(created);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// List all problems
export async function listAllProblems(req, res) {
    try {
        const list = await service.listProblems(req.query);
        res.json(list);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

// Get a problem by ID
export async function getProblemById(req, res) {
    try {
        const item = await service.getProblem(req.params.id);
        if (!item) return res.status(404).json({ error: 'Not found' });
        res.json(item);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// Update a problem by ID
export async function updateProblemById(req, res) {
    try {
        const updated = await service.updateProblem(req.params.id, req.body);
        res.json(updated);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// Delete a problem by ID
export async function deleteProblemById(req, res) {
    try {
        await service.deleteProblem(req.params.id);
        res.status(204).end();
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

// Add an attempt to a problem
export async function addAttemptToProblem(req, res) {
    try {
        const updated = await service.addAttempt(req.params.id, req.body);
        res.json(updated);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}

export async function getProblemsDueToday(req, res) {
    try {
        const list = await service.dueToday();
        res.json(list);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}