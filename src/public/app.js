let matriculaGlobal = "";

function login() {
  const matricula = document.getElementById("matricula").value.trim();

  if (!matricula) {
    mostrarMsg("Digite a matrícula", true);
    return;
  }

  matriculaGlobal = matricula;

  document.getElementById("login").classList.add("hidden");
  document.getElementById("menu").classList.remove("hidden");
}

function marcar(tipo) {
  fetch("/meals/checkin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      matricula: matriculaGlobal,
      tipo
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        mostrarMsg(data.error, true);
      } else {
        mostrarMsg("✅ Refeição registrada com sucesso!");
      }
    })
    .catch(() => {
      mostrarMsg("Erro ao registrar refeição", true);
    });
}

function mostrarMsg(texto, erro = false) {
  const div = document.getElementById("msg");
  div.className = erro ? "err" : "ok";
  div.innerText = texto;
}
