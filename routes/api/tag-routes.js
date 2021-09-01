const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
    .then((tags) => {
      console.log('Getting the all tags');
      res.status(200).json(tags); 
    })
    .catch((err) => { 
      res.status(500).json(err) 
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
  .then((tag) => {
    console.log('Getting the tag');
    res.status(200).json(tag);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then((tag) => {
    console.log('Creating a new tag');
    resstatus(201).json(tag);
  })
  .catch((err) => {res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id 
    },
    individualHooks: true,
})
.then((tag) => {
  console.log('updating the tag');
  res.status(204).json(tag);
})
.catch(
  (err) => {
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((tag) => {
    console.log('Deleting the category');
    res.status(200).json(tag);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

module.exports = router;
