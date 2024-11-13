function addTask() {
  const container = document.querySelector(".main-container");
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");

  if (taskInput.value.trim()) {
    const card = document.createElement("div");
    const priority = prioritySelect.value.toLowerCase(); // Convertimos el valor de prioridad a minúsculas
    card.classList.add("card", priority);

    const text = document.createElement("p");
    text.textContent = taskInput.value;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    deleteBtn.onclick = function () {
      if (priority === "alta") {
        showConfirmModal(card, container);
      } else {
        container.removeChild(card);
      }
    };

    card.appendChild(text);
    card.appendChild(deleteBtn);
    container.appendChild(card);

    taskInput.value = "";
  }
}

function showConfirmModal(card, container) {
  const overlay = document.createElement("div");
  overlay.classList.add("confirm-overlay");

  const confirmBox = document.createElement("div");
  confirmBox.classList.add("confirm-box");
  confirmBox.innerHTML = `
      <p>¿Estás seguro de que deseas eliminar esta tarea de alta prioridad?</p>
      <button onclick="confirmDelete(true)">Confirmar</button>
      <button onclick="confirmDelete(false)">Cancelar</button>
    `;

  overlay.appendChild(confirmBox);
  document.body.appendChild(overlay);

  window.confirmDelete = function (confirm) {
    if (confirm) {
      container.removeChild(card);
    }
    document.body.removeChild(overlay);
  };
}
