const baseUrl = "https://bvnisora.com/be-dummy/api";    // API Dummy
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const getData = () => {
  if (id) {
    fetch(`${baseUrl}/detail_payment/${id}`)
      .then(response => response.json())
      .then(res => {
        const { data } = res;
        if (res.status) {
          data.map(value => changeContent(value));
        }
      })
      .catch(error => console.log(error));
  } else {
    window.location.href = "index.html";
  }
}

const deleteData = () => {
  if (id) {
    fetch(`${baseUrl}/connected/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(res => {
        if (res.status) {
          window.location.href = "index.html";
        } else {
          alert("Error");
        }
      })
      .catch(error => console.log(error));
  }
}

const actionDelete = () => {
  const button = document.querySelector(".btn.true");

  button.addEventListener("click", deleteData);
}

const Detail = async () => {
  getData();
  actionDelete();
}

addEventListener("DOMContentLoaded", Detail);

const changeContent = (data) => {
  const infoBalance = document.querySelector(".info-balance");
  const infoWallet = document.querySelector(".info-name");
  const infoLogo = document.querySelector(".image-logo");
  const infoName = document.querySelector(".akun-name");
  const infoNumber = document.querySelector(".phone-number");
  const infoIdDelete = document.querySelector(".action-delete");

  infoBalance.innerHTML = data.balance;
  infoWallet.innerHTML = "Saldo " + data.vendor;
  infoLogo.src = data.logo;
  infoName.innerHTML = data.name;
  infoNumber.innerHTML = data.phone;
  infoIdDelete.setAttribute("data-id", data.payment_id);
}