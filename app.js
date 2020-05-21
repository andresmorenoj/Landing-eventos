const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000
const app = express();
app.use(bodyParser());

app.listen(PORT, () => console.log('Servidor inciado en el puerto --> ', PORT));

const registros = [];

const administrador = {
  usuario: "Admin",
  contrasenia: '12345'
}

// Middleware
function validarUsuario(req, res, next) {
  const { email } = req.body;
  const usuario = registros.find(persona => persona.email === email)
  if (usuario) {
    return res.status(400).json('El usuario ya existe')
  } else {
    return next()
  }
}

function validarCorreo(req, res, next) {
  const { email } = req.body;
  const correo = email.split('@');
  if ((correo[1] === 'hotmail.com') || (correo[1] === 'gmail.com') || (correo[1] === 'yahoo.com')) {
    return res.status(400).json('El correo no es válido')
  } else {
    return next()
  }
}

function validarAdministrador(req, res, next) {
  const { usuario, contrasenia } = req.body;
  if (usuario !== 'admin' && contrasenia !== '12345') {
    return res.status(401).json('Usuario o contraseña inválidos')
  } else {
    return next()
  }
}

// POST guardar registros
app.post('/landing/registrar', validarUsuario, validarCorreo, (req, res) => {
  const { nombre, apellido, email } = req.body
  registros.push(req.body)
  res.json('Usuario creado')
})

// GET traer todos los registos

app.get('/landing/registros', (req, res) => {
  res.json(registros)
})

// GET administrador
app.get('/landing/administrador', validarAdministrador, (req, res) => {
  const { usuario, contrasenia } = req.body;
  res.json(registros)
})