const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product
    }
  })
    .then((categories) => {
      console.log('Getting the all categories');
      res.status(200).json(categories); 
    })
    .catch((err) => { 
      res.status(500).json(err) 
    })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product
    }
  })
  .then((category) => {
    console.log('Getting the category');
    res.status(200).json(category);
  })
  .catch((err) => {
    res.status(500).json(err)
  });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
  .then((newCategory) => {
    console.log('Creating a new category');
    res.status(201).json(newCategory)})
  .catch((err) => {
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then((category) => {
    console.log('updating the category');
    res.status(204).json(category);
  })
  .catch((err) => {
    res.status(500).json(err); 
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((category) => {
    console.log('Deleting the category');
    res.status(200).json(category);
  })
  .catch((err) => {
    res.status(500).json(err);
  })
});

module.exports = router;
