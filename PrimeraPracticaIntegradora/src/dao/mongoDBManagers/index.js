const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        return mongoose.connect("")
        .then(()=>{
            console.log(" Base de datos MongoDB conectada");
        }).catch((err)=>{
            console.log(err)
        })
    }
}