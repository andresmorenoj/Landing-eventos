console.log('Aqui entro');

let nombre = document.getElementById('exampleInputName').value;
let apellido = document.getElementById('exampleInputLastName').value;
let email = document.getElementById('exampleInputEmail1').value;
let enviar = document.querySelector('button')
console.log(enviar);


const data = {
  nombre: nombre,
  apellido: apellido,
  email: email
}

const URL = 'localhost:3000/landing/registrar'

function crearTicket() {
  const ticket =
    fetch(URL,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(res => {
        return console.log(res);
      })
  return ticket

}

enviar.addEventListener('click', () => {
  crearTicket()
})
