const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});
module.exports = mongoose.model('Project', ProjectSchema);
