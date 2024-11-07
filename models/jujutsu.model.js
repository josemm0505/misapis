import mongoose from 'mongoose';

const jujutsuSchema = new mongoose.Schema({
  nombre:{
    type: String,
    required: true
  },
  kanji:{
    type: String,
    required: true
  },
  hiragana:{
    type: String,
    required: true
  },
  romaji:{
    type: String,
    required: true
  },
  especie:{
    type: String,
    required: true
  },
  genero:{
    type: String,
    required: true
  },
  edad:{
    type: Number,
    required: false
  },
  afiliacion:{
    type: String,
    required: true
  },
  ocupacion:{
    type: [String],
    required: false
  },
  grado:{
    type: String,
    required: true
  },
  descripcion:{
    type: String,
    required: true
  },
  imagen:{
    type: String,
    required: true
  }
});

const Jujutsu = mongoose.model('Jujutsu', jujutsuSchema); 

export default Jujutsu;