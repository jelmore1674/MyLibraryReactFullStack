const router = require('express').Router();
const libraryController = require('../controllers/library');

// Add Book to library, Logic is in Library Controller
router.post('/', libraryController.addToLibrary);
// Updated Library Items, Logic is in Library Controller
router.put('/', libraryController.updateLibrary);
// Delete Book From Library
router.delete('/', libraryController.removeBook);
// API that displays books in library based on userid, Logic is in Library Controller
router.get('/:userId', libraryController.displayLibrary);

module.exports = router;