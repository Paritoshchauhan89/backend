import Journal from '../models/journalModel.js';

// Get all journals
export const getAllJournals = async (req, res) => {
    try {
      const journals = await Journal.find();
      const totalCount = await Journal.countDocuments();
      res.json({ totalCount, journals });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// Get a single journal by ID
export const getJournalById = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (journal) {
      res.json(journal);
    } else {
      res.status(404).json({ message: 'Journal not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new journal
export const createJournal = async (req, res) => {
  const journal = new Journal(req.body);
  try {
    const newJournal = await journal.save();
    res.status(201).json(newJournal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a journal
export const updateJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (journal) {
      journal.set(req.body);
      const updatedJournal = await journal.save();
      res.json(updatedJournal);
    } else {
      res.status(404).json({ message: 'Journal not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a journal
// Delete a journal
export const deleteJournal = async (req, res) => {
    try {
      const deletedJournal = await Journal.deleteOne({ _id: req.params.id });
      if (deletedJournal.deletedCount > 0) {
        res.json({ message: 'Journal deleted' });
      } else {
        res.status(404).json({ message: 'Journal not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
