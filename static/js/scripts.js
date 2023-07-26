const messagesList = document.querySelector('.messages-list');
const messageForm = document.querySelector('.message-form');
const messageInput = document.querySelector('.message-input');

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (message.length === 0) {
    return;
  }
  
  const messageItem = document.createElement('li');
  messageItem.classList.add('message', 'sent');
  messageItem.innerHTML = `
      <div class="message-text">
          <div class="message-sender">
              <b>Tu</b>
          </div>
          <div class="message-content">
              ${message}
          </div>
      </div>`;
  messagesList.appendChild(messageItem);

  messageInput.value = '';
  
  fetch('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      'csrfmiddlewaretoken': document.querySelector('[name=csrfmiddlewaretoken]').value,
      'message': message
    })
  })
    .then(response => response.json())
    .then(data => {
      const response = data.response;
      const messageItem = document.createElement('li');
      messageItem.classList.add('message', 'received');
      
      const messageContent = document.createElement('div');
      messageContent.classList.add('message-content');
      messageItem.appendChild(messageContent);
      
      messagesList.appendChild(messageItem);
      
      // Obtener referencia a la imagen principal del gato
      const gatoMain = document.querySelector('.img-fluid');
      // Guardar la ruta de la imagen principal del gato
      const rutaImagenMain = gatoMain.src;
      // Función para cambiar la imagen a la animación
      const cambiarAAnimacion = () => {
        gatoMain.src = 'static/img/michitut-tu2t-animacion.gif'; // Cambia 'ruta_de_la_animacion.gif' por la ruta de tu animación
      };

      // Función para cambiar la imagen a la principal
      const cambiarAImagenMain = () => {
        gatoMain.src = rutaImagenMain;
      };

      // Iniciar la animación cuando empiece la respuesta
      cambiarAAnimacion();

      let index = 0;
      const typeResponse = () => {
        if (index < response.length) {
          messageContent.textContent += response.charAt(index);
          index++;
          setTimeout(typeResponse, 50); // Ajusta la velocidad de reproducción aquí (milisegundos)
        }else {
          // Detener la animación cuando termine la respuesta
          cambiarAImagenMain();
        }
      }
      typeResponse();
    });
});
