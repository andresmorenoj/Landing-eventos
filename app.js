const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();
const Sequelize = require('sequelize');
const { response } = require('express');
const sequelize = new Sequelize(
  'mysql://root:6TF7US3EB@localhost:3306/clase52'
);
app.use(bodyParser());

app.listen(PORT, () => console.log('Servidor inciado en el puerto --> ', PORT));

const registros = [];

const administrador = {
  usuario: 'Admin',
  contrasenia: '12345',
};

// Middleware
function validarUsuario(req, res, next) {
  const { email } = req.body;
  sequelize
    .query('SELECT * FROM user where email = ?', {
      replacements: [email],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        return res.status(400).json('El usuario ya existe');
      } else {
        return next();
      }
    });
}

function validarCorreo(req, res, next) {
  const { email } = req.body;
  const correo = email.split('@');
  if (
    correo[1] === 'hotmail.com' ||
    correo[1] === 'gmail.com' ||
    correo[1] === 'yahoo.com'
  ) {
    return res.status(400).json('El correo no es válido');
  } else {
    return next();
  }
}

function validarAdministrador(req, res, next) {
  sequelize
    .query('SELECT * FROM user where admin = ?', {
      replacements: [1],
      type: sequelize.QueryTypes.SELECT,
    })
    .then((response) => {
      if (response.length) {
        return next();
      } else {
        return res.status(401).json('Usuario sin permisos requeridos');
      }
    });

  // const { usuario, contrasenia } = req.body;
  // if (usuario !== 'admin' && contrasenia !== '12345') {
  //   return res.status(401).json('usuario o contraseña inválidos');
  // } else {
  //   return next();
  // }
}

// POST guardar registros

app.post('/landing/registrar', validarUsuario, validarCorreo, (req, res) => {
  const { name, last_name, email, admin } = req.body;
  sequelize.query(
    'INSERT INTO user (name, last_name, email, admin) VALUES (?,?,?,?)',
    {
      replacements: [name, last_name, email, admin],
    }
  );
  res.json('Usuario creado');
});

// GET traer todos los registos

app.get('/landing/registros', (req, res) => {
  sequelize
    .query('SELECT * FROM user', { type: sequelize.QueryTypes.SELECT })
    .then((response) => res.json(response));
});

// GET administrador
app.get('/landing/administrador', validarAdministrador, (req, res) => {
  sequelize
    .query('SELECT * FROM user', { type: sequelize.QueryTypes.SELECT })
    .then((response) => res.json(response));
});
