const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        return mongoose.connect("mongodb+srv://giulicravotta:EcommerceProyect@proyectobackend-cluster.tfjprb3.mongodb.net/?retryWrites=true&w=majority")
            .then(() => {
                console.log("Base de datos MongoDB conectada");
            }).catch((err) => {
                console.error("Error al conectar con la base de datos MongoDB:", err);
            });
    }
}
