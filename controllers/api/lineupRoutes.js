const router = require('express').Router();
const { lineup } = require('../../models');



router.get('/', async (req, res) => {

    try {
        const lineups = await lineup.findAll({
            include: [{ model: lineup }]
        });
        res.status(200).json(lineups)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    // get a lineup by its `id` value

    try {
        const lineups = await lineup.findByPK(req.params.id, {
            include: [{ model, Product }]
        });
        //conditional statement - if lineup not found return 404 error
        if (!lineups) {
            res.status(404).json({ message: 'No lineup found with this id!' });
            return;
        }
        res.status(200).json(lineups);
    } catch (error) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    // create a new lineup
    try {
        const lineups = await lineup.create(req.body);
        res.status(200).json(lineups);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    // update a lineup by its `id` value
    lineup.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
    res.status(200).json()
});

router.delete('/:id', (req, res) => {
    // delete a lineup by its `id` value
    try {
        const lineups = await lineup.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!lineups) {
            res.status(404).json()
            return;
        }
        res.status(200).json.(lineups);
    } catch (err) {
        res.status(500).json.json(err);
    }
});

module.exports = router;