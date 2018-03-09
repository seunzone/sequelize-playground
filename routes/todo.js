const express = require('express');
const router = express.Router();
const model = require('../models/index');

//middleware to hanlde errors
const awaitErorrHandlerFactory = middleware => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

/* GET todo listing. */
router.get(
  "/",
  awaitErorrHandlerFactory(async (req, res, next) => {
    const todos = await model.Todo.findAll({});
    return res.json({
      error: false,
      data: todos
    });
  })
);


/* POST todo. */
router.post(
  "/",
  awaitErorrHandlerFactory(async (req, res, next) => {
    const { title, description } = req.body;
    const todo = model.Todo.create({
      title: title,
      description: description
    });
    return res.status(201).json({
      error: false,
      data: todo,
      message: "New todo has been created."
    });
  })
);


/* update todo. */
router.put(
  "/:id",
  awaitErorrHandlerFactory(async (req, res, next) => {
    const todo_id = req.params.id;

    const { title, description } = req.body;

    model.Todo.update(
      { title: title, description: description },
      { where: { id: todo_id } }
    );

    return res.status(201).json({
      error: false,
      message: "todo has been updated."
    });
  })
);


/* Delete todo. */
router.delete(
  "/:id",
  awaitErorrHandlerFactory(async (req, res, next) => {
    const todo_id = req.params.id;

    model.Todo.destroy({
      where: {
        id: todo_id
      }
    });

    return res.status(201).json({
      error: false,
      message: "todo has been delete."
    });
  })
);

module.exports = router;
