const Bug = require('../models/bug');
const { validateBugPayload } = require('../utils/validators');

async function createBug(req, res, next) {
  try {
    const { isValid, errors } = validateBugPayload(req.body);
    if (!isValid) return res.status(400).json({ errors });

    const bug = new Bug(req.body);
    const saved = await bug.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
}

async function getBugs(req, res, next) {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) { next(err); }
}

async function updateBug(req, res, next) {
  try {
    const { id } = req.params;
    const { isValid, errors } = validateBugPayload(req.body);
    if (!isValid) return res.status(400).json({ errors });

    const updated = await Bug.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Bug not found' });
    res.json(updated);
  } catch (err) { next(err); }
}

async function deleteBug(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Bug.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
}

module.exports = { createBug, getBugs, updateBug, deleteBug };
