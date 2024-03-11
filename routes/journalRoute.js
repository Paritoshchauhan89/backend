// routes/journalRoutes.js
import express from 'express';
import * as journalController from '../controllers/journalController.js';

const router = express.Router();

router.get('/', journalController.getAllJournals);
router.post('/', journalController.createJournal);
router.get('/:id', journalController.getJournalById);
router.put('/:id', journalController.updateJournal);
router.delete('/:id', journalController.deleteJournal);

export default router;
