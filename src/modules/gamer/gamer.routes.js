const express = require("express");
const gamerService = require("./gamer.service");

const router = express.Router();

// GET /api/gamer
router.get("/api/gamer", async (req, res) => {
  // #swagger.tags = ['Gamer']
  try {
    params = JSON.parse(req.headers['params'])

    let paginated = await gamerService.paginated(params)
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

// GET /api/gamer/:id
router.get("/api/gamer/:id",  async (req, res) => {
  // #swagger.tags = ['Gamer']
  try {
    const userId = req.params.id;
    const user = await gamerService.findOneById(userId);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});


// POST /api/gamer
router.post("/api/gamer", async (req, res) => {
  // #swagger.tags = ['Gamer']
  try {
    const { name, age, game } = req.body;

    const newGamer = {
      name,
      age,
      game,
    };
    console.log(newGamer);

    const gamer = await gamerService.save(newGamer);

    if (!gamer) {
      return res.status(400).send({ error: "Campos incompletos" });
    }

    return res.status(201).send(gamer);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

/* PUT /api/gamer/:id
router.put("/api/gamer/:id",  async (req, res) => {
  // #swagger.tags = ['Gamer']
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    const user = await gamerService.update(userId, updatedUser);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});*/

// PUT /api/gamer/:id
router.put("/api/gamer/:id", async (req, res) => {
  // #swagger.tags = ['Gamer']
  try {
    const userId = req.params.id;
    const { name, age, game } = req.body;

    const updatedGamer = {
      name,
      age,
      gamne,
    };
    console.log(updatedGamer);

    const user = await gamerService.update(userId, updatedGamer);
    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/gamer/:id
router.delete("/api/gamer/:id", async (req, res) => {
  // #swagger.tags = ['Gamer']
  try {
    const userId = req.params.id;
    await gamerService.remove(userId);
    return res.status(200).send("Usuario eliminado correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;








