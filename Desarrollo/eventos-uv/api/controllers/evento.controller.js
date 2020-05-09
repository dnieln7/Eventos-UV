const {evento} = require("../models");
const headers = require("../helpers/headers");

const MODULE_NAME = '[Evento Controller]';

function getEventos(req, res) {
    evento.findAll()
        .then(users => res.status(200).send(users))
        .catch(error => res.status(500).send(error));
}

function getEventoById(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;

    evento.findByPk(idIn, {include: ['participantes']})
        .then(user => res.status(200).send(user))
        .catch(error => res.status(403).send(error));
}

function postEvento(req, res) {
    headers.setHeaders(res);

    const eventoIn = req.body;

    return evento.create(eventoIn)
        .then(evento => res.status(201).send(evento))
        .catch(error => res.status(400).send(error));
}

function putEvento(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;
    const eventoIn = req.body;

    evento.findByPk(idIn).then(evento => {
        if (!evento) {
            return res.status(404).send({message: "No encontrado!"});
        }

        return evento.update(eventoIn)
            .then(newEvento => res.status(200).send(newEvento))
            .catch(error => res.status(403).send(error));
    }).catch(error => console.log(error));
}

function deleteEvento(req, res) {
    headers.setHeaders(res);

    const idIn = req.swagger.params.id.value;

    evento.findByPk(idIn).then(evento => {
        if (!evento) {
            return res.status(200).send({success: 0, description: "No encontrado!"});
        } else {
            return evento.destroy()
                .then(() => res.status(200).send({success: 1, description: "Eliminado!"}))
                .catch(() => res.status(403).send({success: 0, description: "Error!"}))
        }
    }).catch(error => console.log(error));
}


module.exports = {
    getEventos,
    getEventoById,
    postEvento,
    putEvento,
    deleteEvento,
    MODULE_NAME
};
