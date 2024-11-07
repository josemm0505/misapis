import { Router } from "express";
import {getAllJujutsu, getJujutsuById, postJujutsu, putJujutsu,deleteJujutsu}from '../controllers/jujutsu.controller.js'
const jujutsu = Router();

jujutsu.get('/',getAllJujutsu)

jujutsu.get("/:id", getJujutsuById)

jujutsu.post("/", postJujutsu);

jujutsu.put("/:id", putJujutsu);

jujutsu.delete("/:id", deleteJujutsu);

export default jujutsu;