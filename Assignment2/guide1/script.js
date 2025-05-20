function playAudio() {
    document.getElementById('guideAudio').play();
  }
  
  function goToIngredients() {
    window.location.href = '../bake/index.html';
}
document.getElementById('bake-button').addEventListener('click', function () {
    window.location.href = '../bake/index.html';
  });
  