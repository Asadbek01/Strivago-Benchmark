import express from "express";
import { AccommodationModel } from "../Schema/models";

const accommodationRouter = express.Router();

accommodationRouter.get("/", async (req, res, next) => {
  try {
    const accommodation = await AccommodationModel.find();
    if (accommodation) {
      res.status(200).send(accommodation);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(404).send();
    console.log();
  }
});
accommodationRouter.post("/", async (req, res, next) => {
  try {
    const accommodation = new AccommodationModel(req.body);
    await accommodation.save();
    if (accommodation) {
      res.status(200).send(accommodation);
    } else {
      res.status(400).send();
    }
  } catch (error) {
    res.status(400).send(); // this needs to change to next(httpCreateError())
    console.log(error);
  }
});
accommodationRouter.get("/:id", async (req, res, next) => {
  try {
    const accommodation = await AccommodationModel.findById(req.params.id)
  
    if (accommodation) {
      res.status(200).send(accommodation);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(400).send(); // this needs to change to next(httpCreateError())
    console.log(error);
  }
});
accommodationRouter.put("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const accommodation = await AccommodationModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (accommodation) {
      res.status(200).send(accommodation);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    res.status(404).send(); 
    console.log(error);
  }
});
accommodationRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const accommodation = await AccommodationModel.findByIdAndDelete(id);
    if (accommodation) {
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  } catch (error) {
    console.log(error);
  }
});

export default accommodationRouter;
