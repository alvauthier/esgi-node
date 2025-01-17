const userService = require("../services/user");

module.exports = {
  cget: async (req, res, next) => {
    const {
      _page = 1,
      _itemsPerPage = 10,
      _sort = {},
      ...criteria
    } = req.query;
    try {
      const users = await userService.findAll(criteria, {
        offset: (_page - 1) * _itemsPerPage,
        limit: _itemsPerPage,
        order: _sort,
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  },
  post: async (req, res, next) => {
    try {
      console.log("post");
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const user = await userService.findById(parseInt(req.params.id));
      if (!user) return res.sendStatus(404);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
  put: async (req, res, next) => {
    try {
      const nbRemoved = await userService.remove({
        id: parseInt(req.params.id),
      });
      const user = await userService.create({
        id: parseInt(req.params.id),
        ...req.body,
      });
      res.status(nbRemoved ? 200 : 201).json(user);
    } catch (err) {
      next(err);
    }
  },
  patch: async (req, res, next) => {
    try {
      const [user] = await userService.update(
        { id: parseInt(req.params.id) },
        req.body
      );
      if (!user) return res.sendStatus(404);
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    try {
      const nbRemoved = await userService.remove({
        id: parseInt(req.params.id),
      });
      res.sendStatus(nbRemoved ? 204 : 404);
    } catch (err) {
      next(err);
    }
  },
};
