const { validationResult } = require('express-validator');
const SelfAssessment = require('../models/SelfAssessment');
const Patient = require('../models/Patient');
const Comment = require('../models/Comment');

exports.submitSelfAssessment = async (req, res, next) => {
  // Check if input data has errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { a1, a2, a3, a4, a5, a6, a7 } = req.body;
  try {
    const selfAssessment = await SelfAssessment.create({
      a1,
      a2,
      a3,
      a4,
      a5,
      a6,
      a7,
      PatientId: req.patient.id,
    });
    return res.status(200).json(selfAssessment);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.getSelfAssessments = async (req, res, next) => {
  const { id } = req.patient;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) return res.status(400).json({ errors: [{ msg: 'Invalid token' }] });
    const selfAssessments = await patient.getSelfAssessments();
    return res.status(200).json({ selfAssessments });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};

exports.getSaComments = async (req, res, next) => {
  const saId = req.params.id;
  try {
    const sa = await SelfAssessment.findByPk(saId);
    const comments = await Comment.findAll({ where: { selfAssessmentId: sa.id } });
    return res.status(200).json({ comments });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Server error');
  }
};
