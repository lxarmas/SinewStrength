const router = require('express').Router()
const { models: { User, Training_programs }} = require('../db');
module.exports = router

// GET /api/trainingPrograms
router.get('/', async (req, res, next) => {
   try {
      const user = await User.findOne({
         where: {
            username: req.query.username
         }
      });

      const currentTrainingProgram = await Training_programs.findOne({
         where: {
            userId: user.id,
            active: true
         }
      });

      if (currentTrainingProgram) {
         res.status(200).json(currentTrainingProgram);
      } else {
         res.status(200).json([]);
      }
   } catch (err) {
      next(err);
   }
});

// GET /api/trainingPrograms/all
router.get('/all', async (req, res, next) => {
   try {
      const user = await User.findOne({
         where: {
            username: req.query.username
         }
      });

      const allPrograms = await Training_programs.findAll({
         where: {
            userId: user.id
         }
      });

      if (allPrograms) {
         res.status(200).json(allPrograms);
      } else {
         res.status(200).json([]);
      }
   } catch (err) {
      next(err);
   }
});

// GET /api/trainingPrograms/:programId
router.get('/:programId', async (req, res, next) => {
   try {
      const user = await User.findOne({
         where: {
            username: req.query.username
         }
      });

      const pastProgram = await Training_programs.findOne({
         where: {
            userId: user.id,
            id: req.params.programId
         }
      });

      if (pastProgram) {
         res.status(200).json(pastProgram);
      } else {
         res.status(200).json([]);
      }
   } catch (err) {
      next(err);
   }
});

// POST /api/trainingPrograms
router.post('/', async (req, res, next) => {
   try {
      const user = await User.findOne({
         where: {
            username: req.body.username
         }
      });

      const newProgram = await Training_programs.create(req.body.newProgram);
      newProgram.userId = user.id;
      await Training_programs.update(newProgram.dataValues, {
         where: { id: newProgram.id }
      });
      res.json(newProgram);
   } catch (err) {
      next(err);
   }
});

// PUT /api/trainingPrograms/:trainingProgramId
router.put('/:trainingProgramId', async (req, res, next) => {
   try {
      const { trainingProgramId } = req.params;
      const { username, weekIndex, dayIndex, exerciseIndex } = req.body;

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      const trainingProgram = await Training_programs.findOne({
         where: {
            id: trainingProgramId,
            userId: user.id
         }
      });

      // Toggle the boolean value for the 'completed' property
      trainingProgram.weeks[weekIndex].days[dayIndex].exercises[exerciseIndex].completed = !trainingProgram.weeks[weekIndex].days[dayIndex].exercises[exerciseIndex].completed;

      // Check if all exercises in the day are completed
      const allExercisesCompleted = trainingProgram.weeks[weekIndex].days[dayIndex].exercises.every(exercise => exercise.completed);

      // Update the completed property of the day
      trainingProgram.weeks[weekIndex].days[dayIndex].completed = allExercisesCompleted;

      // Check if all days in the week are completed
      const allDaysCompleted = trainingProgram.weeks[weekIndex].days.every(day => day.completed);

      // Update the completed property of the week
      trainingProgram.weeks[weekIndex].completed = allDaysCompleted;

      // Check if all weeks in the training program are completed
      const allWeeksCompleted = trainingProgram.weeks.every(week => week.completed);

      // Update the completed property of the training program
      trainingProgram.completed = allWeeksCompleted;

      // Save the updated training program
      await Training_programs.update(trainingProgram.dataValues, {
         where: { id: trainingProgramId }
      });

      const updatedProgram = trainingProgram;
      res.send(updatedProgram);
   } catch (err) {
      next(err);
   }
});

// PUT /api/trainingPrograms/archive/:trainingProgramId
router.put('/archive/:trainingProgramId', async (req, res, next) => {
   try {
      const { trainingProgramId } = req.params;
      const { username } = req.body;

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      const trainingProgram = await Training_programs.findOne({
         where: {
            id: trainingProgramId,
            userId: user.id
         }
      });

      // Update active status to false
      trainingProgram.active = false;
      await trainingProgram.save();

      res.status(201).json([]);
   } catch (err) {
      next(err);
   }
});

// DELETE /api/trainingPrograms/:trainingProgramId
router.delete('/:trainingProgramId', async (req, res, next) => {
   try {
      const trainingProgramId = req.params.trainingProgramId;
      const { username } = req.query;

      const user = await User.findOne({
         where: {
            username: username
         }
      });

      const trainingProgram = await Training_programs.findOne({
         where: {
            id: trainingProgramId,
            userId: user.id
         }
      });

      await trainingProgram.destroy();

      res.sendStatus(204);
   } catch (err) {
      next(err);
   }
});