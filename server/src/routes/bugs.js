const express = require('express');
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require('../controllers/bugsController');

router.post('/', ctrl.createBug);
router.get('/', ctrl.getBugs);
router.put('/:id', ctrl.updateBug);
router.delete('/:id', ctrl.deleteBug);

module.exports = router;
