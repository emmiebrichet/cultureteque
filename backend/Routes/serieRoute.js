const express = require('express');
const router = express.Router();

const {
  getAllSerie,
  getSerieByActor,
  getSerieByActorName,
  getSerieByTitle,
  getSerieByWordInTitle,
  getSerieByMotCle
} = require('../Controllers/serieController');

router.get('/all_serie', getAllSerie);
router.get('/getSerieByActor/:actor', getSerieByActor);
router.get('/getSerieByActorName/:actorName', getSerieByActorName);
router.get('/getSerieByTitle/:title', getSerieByTitle);
router.get('/getSerieByWordInTitle/:word', getSerieByWordInTitle);
router.get('/getSerieByMotCle/:motCle', getSerieByMotCle);


module.exports = router;
