import Jujutsu from '../models/jujutsu.model.js';
import mongoose from 'mongoose';
import express from 'express';

export const getAllJujutsu = async (req, res) =>{
    console.log('Obtiene todos los ejemplos');
    try{
        const jujutsu = await Jujutsu.find({}, {__v:0});
        if(jujutsu.length === 0){
            return res.status(404).json({
                message: 'No se encontraron ejemplos'
            })
        }
        return res.status(200).json({
            jujutsu
        })
    }catch(error){
         return res.status(500).json({
            message: 'Error al obtener los ejemplos',
        })
    }
};

export const getJujutsuById = async (req, res) =>{
    console.log('Obtiene un ejemplo por id');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'El id no es valido'
            })
        }
        const jujutsu = await Jujutsu.findById(id);
        if(!jujutsu){
            return res.status(404).json({
                message: 'No se encontro el ejemplo'
            })
        }

        return res.status(200).json({
            jujutsu
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener el ejemplo',
        })
    }
};

export const postJujutsu = async (req, res) =>{
    console.log('Crea un nuevo ejemplo');
    const body = req.body;
    const jujutsu = new Jujutsu(body);
    try {
        const validationError = jujutsu.validateSync();
        if(validationError){
            const errorMessages = Object.values(validationError.errors).map((error) => error.message);  
            return res.status(400).json({
                error: errorMessages
            })
        }
        await jujutsu.save();
        return res.status(201).json({
            jujutsu
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear el ejemplo',
        })
    }
};

export const putJujutsu = async (req,res) =>{
    const id = req.params.id;
    const body = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'El id no es valido'
            })
        }
        const jujutsu = await Jujutsu.findByIdAndUpdate(id, body, {new: true, runValidators:true});
        if(!jujutsu){
            return res.status(404).json({
                message: 'No se encontro el ejemplo'
            })
        }
        return res.status(200).json({
            jujutsu
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el ejemplo',
        })
    }
}

export const deleteJujutsu = async (req, res) =>{
    console.log('Elimina un ejemplo');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'El id no es valido'
            })
        }
        const jujutsu = await Jujutsu.findByIdAndDelete(id);
        if(!jujutsu){
            return res.status(404).json({
                message: 'No se encontro el ejemplo'
            })
        }
        return res.status(200).json({
            message: 'Ejemplo eliminado',
            jujutsu
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el ejemplo',
        })
    }
}