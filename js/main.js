let btnClick = false;

let domElement = {
  adviceNum : document.querySelector("#advice-id"),
  adviceContent : document.querySelector("#advice-content"),
  adviceBtn : document.querySelector(".generate-btn"),
};

domElement.adviceBtn.addEventListener('click', () => {
  showAnimation();
  setTimeout(() => {
    replaceText();
  }, 1000)
})

function showAnimation() {
  if(btnClick) return
  btnClick = true;
  let animation = document.querySelector(".animation-container");
  let loadingText = document.querySelector("#loading-text");

  domElement.adviceNum.classList.add('opacity-0')
  domElement.adviceContent.classList.add('opacity-0')
  animation.classList.remove('opacity-0');
  loadingText.classList.remove('opacity-0');

  setTimeout(() => {
    animation.classList.add('opacity-0');
    loadingText.classList.add('opacity-0');
    setTimeout(() => {
      domElement.adviceNum.classList.remove('opacity-0')
      domElement.adviceContent.classList.remove('opacity-0')
      btnClick = false;
    }, 500)
  }, 2000)
}

async function getAdviceData () {
  const adviceApi = '	https://api.adviceslip.com/advice';
  try {
    const res = await fetch(adviceApi)
    const data = await res.json();
    return data;
  }catch (err) {
    return err;
  }
}

async function replaceText () {
  getAdviceData()
  .then(data => {
    if(data.message) {
      showError();
    }else {
      domElement.adviceNum.innerText = `ADVICE #${data.slip.id}`
      domElement.adviceContent.innerText = `“${data.slip.advice}”`
    } 
  })
}

function showError () {
  domElement.adviceNum.innerText = `------ ---`
  domElement.adviceContent.innerText = `Can't Fatch The URL`
}