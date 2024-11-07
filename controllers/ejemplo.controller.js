import Ejemplo from '../models/ejemplo.model.js'
import mongoose from 'mongoose';
import express from 'express';

export const getAllEjemplos = async (req, res) =>{
    console.log('Obtiene todos los ejemplos');
    try{
        const ejemplos = await Ejemplo.find({}, {__v:0});
        if(ejemplos.length === 0){
            return res.status(404).json({
                message: 'No se encontraron ejemplos'
            })
        }
        return res.status(200).json({
            ejemplos
        })
    }catch(error){
         return res.status(500).json({
            message: 'Error al obtener los ejemplos',
        })
    }
};

export const getEjemploById = async (req, res) =>{
    console.log('Obtiene un ejemplo por id');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'El id no es valido'
            })
        }
        const ejemplo = await Ejemplo.findById(id);
        if(!ejemplo){
            return res.status(404).json({
                message: 'No se encontro el ejemplo'
            })
        }

        return res.status(200).json({
            ejemplo
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al obtener el ejemplo',
        })
    }
};

export const postEjemplo = async (req, res) =>{
    console.log('Crea un nuevo ejemplo');
    const body = req.body;
    const ejemplo = new Ejemplo(body);
    try {
        const validationError = ejemplo.validateSync();
        if(validationError){
            const errorMessages = Object.values(validationError.errors).map((error) => error.message);  
            return res.status(400).json({
                error: errorMessages
            })
        }
        await ejemplo.save();
        return res.status(201).json({
            ejemplo
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al crear el ejemplo',
        })
    }
};

export const putEjemplo = async (req,res) =>{
    const id = req.params.id;
    const body = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'El id no es valido'
            })
        }
        const ejemplo = await Ejemplo.findByIdAndUpdate(id, body, {new: true, runValidators:true});
        if(!ejemplo){
            return res.status(404).json({
                message: 'No se encontro el ejemplo'
            })
        }
        return res.status(200).json({
            ejemplo
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al actualizar el ejemplo',
        })
    }
}

export const deleteEjemplo = async (req, res) =>{
    console.log('Elimina un ejemplo');
    const id = req.params.id;
    try {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({
                message: 'El id no es valido'
            })
        }
        const ejemplo = await Ejemplo.findByIdAndDelete(id);
        if(!ejemplo){
            return res.status(404).json({
                message: 'No se encontro el ejemplo'
            })
        }
        return res.status(200).json({
            message: 'Ejemplo eliminado',
            ejemplo
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Error al eliminar el ejemplo',
        })
    }
}