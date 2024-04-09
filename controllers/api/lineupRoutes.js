const router = require('express').Router();
const winston = require('winston');
const { Lineup } = require('../../models');
const { lineup } = require('../../models');

const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

  router.get('/', async (req, res) => {
    try {
        const lineups = await Lineup.findAll({
            include: [{ model: lineup }]
        });
        res.status(200).json(lineups);
        logger.info('Successfully fetched all lineups');
    } catch (err) {
        res.status(500).json(err);
        logger.error(`Error occurred while fetching lineups: ${err}`);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const lineups = await lineup.findByPK(req.params.id, {
            include: [{ model }]
        });
        if (!lineups) {
            res.status(404).json({ message: 'No lineup found with this id!' });
            return;
        }
        res.status(200).json(lineups);
        logger.info(`Successfully fetched lineup with id ${req.params.id}`);
    } catch (error) {
        res.status(500).json(err);
        logger.error(`Error occurred while fetching lineup with id ${req.params.id}: ${err}`);
    }
});

router.post('/', async (req, res) => {
    try {
        const lineups = await lineup.create(req.body);
        res.status(200).json(lineups);
        logger.info('Successfully created a new lineup');
    } catch (err) {
        res.status(400).json(err);
        logger.error(`Error occurred while creating a new lineup: ${err}`);
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Lineup.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json();
        logger.info(`Successfully updated lineup with id ${req.params.id}`);
    } catch (err) {
        res.status(500).json(err);
        logger.error(`Error occurred while updating lineup with id ${req.params.id}: ${err}`);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const lineups = await lineup.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!lineups) {
            res.status(404).json();
            return;
        }
        res.status(200).json(lineups);
        logger.info(`Successfully deleted lineup with id ${req.params.id}`);
    } catch (err) {
        res.status(500).json(err);
        logger.error(`Error occurred while deleting lineup with id ${req.params.id}: ${err}`);
    }
});

module.exports = router;

