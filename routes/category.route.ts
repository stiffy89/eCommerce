import express, { type Application, type Request, type Response } from 'express';
import { Category } from '../models/category.model';
import { getErrorMessage } from '../helpers/HelperFunctions';

const router = express.Router();

//POST
router.post("/", async (req : Request, res : Response) => {
    try {

        if (!req.body.name || req.body.name.trim().length < 3) {
            return res.status(400).send({
                message: 'Please include a category name that is greater than 3 letters'
            })
        }

        let newCategory = await Category.create({
            name: req.body.name
        })

        return res.status(201).send(newCategory)
    }
    catch (error: unknown) {
        const message = getErrorMessage(error);
        return res.status(400).send({ message })
    }
})

//GET
router.get("/", async(req, res) => {
    try {
        const categoryList = await Category.find({}); // find gets our categories from the db. If you want to apply filters, the object we're passing will have other properties
        res.status(200).send(categoryList);
    }
    catch (error : unknown) {
        const message = getErrorMessage(error);
        return res.status(400).send({message})
    }
})

//DELETE
router.delete("/:id", async(req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory){
            return res.status(404).send({
                message: 'No category found with this ID'
            })
        }

        return res.status(200).send(deletedCategory);
    }
    catch (error) {
        const message = getErrorMessage(error);
        return res.status(400).send({message})
    }
})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new : true}); //so in the update, we can use the new property on the options object to return the new value after it has been updated

        if (!updatedCategory){
            return res.status(400).send({
                message: 'No Category found with this ID'
            })
        }

        return res.status(200).send(updatedCategory);
    }
    catch (error) {
        const message = getErrorMessage(error);
        return res.status(400).send({message});
    }
})




export default router;