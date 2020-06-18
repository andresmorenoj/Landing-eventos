let info = document.getElementById('info');
let ver = document.getElementById('ver');

info.style.display = 'none';
ver.addEventListener(onclick =>() {
    let url = 'localhost:3000/landing/administrador'
    const verRegistros = 
        fetch(url)
        .then (response => response.json())
            .then(response => {
                info.style.display = 'block';
            })
});