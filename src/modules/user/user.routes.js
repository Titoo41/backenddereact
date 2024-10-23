const express = require("express");
const userService = require("./user.service");

const router = express.Router();

router.get("/api/user", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const params = JSON.parse(req.headers['params'] || '{}');  // Evita que `undefined` rompa la aplicación

    let paginated = await userService.paginated(params);
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});


// GET /api/user/:id
router.get("/api/user/:id",  async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    const user = await userService.findOneById(userId);
    return res.status(200).send(user);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

router.post("/api/user", async (req, res) => {
  const { firstname, lastname, domicilio, celular, documento, rol, area } = req.body;

  if (!firstname || !lastname ) {
    return res.status(400).send({ error: "Faltan campos obligatorios" });
  }

  try {


    const newUser = { firstname, lastname, domicilio, celular, documento, rol, area };

    // Guardar el nuevo usuario
    const user = await userService.save(newUser);
    return res.status(201).send(user);

  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Error interno del servidor' });
  }
});


router.put("/api/user/:id", async (req, res) => {
  const userId = req.params.id;
  const { firstname, lastname, email, domicilio, celular, documento, rol, area } = req.body;

  try {
    const updatedUser = { firstname, lastname, email, domicilio, celular, documento, rol, area };

    const user = await userService.update(userId, updatedUser);
    if (!user) {
      return res.status(404).send({ error: "Usuario no encontrado" });
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Error interno del servidor" });
  }
});

// DELETE /api/user/:id
router.delete("/api/user/:id", async (req, res) => {
  // #swagger.tags = ['Usuario']
  try {
    const userId = req.params.id;
    await userService.remove(userId);
    return res.status(200).send("Usuario eliminado correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;


