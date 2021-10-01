
var board;
const fileinput=document.getElementById("file"),
      preview=document.getElementById("preview");
var image=new Image();
const pieceType = {
  0: "--",
  1: "wP",
  2: "wN",
  3: "wB",
  4: "wR",
  5: "wQ",
  6: "wK",
  7: "bP",
  8: "bN",
  9: "bB",
  10: "bR",
  11: "bQ",
  12: "bK"
};
addEventListener("load",async function(){
  board=ChessBoard("myBoard")
  model=await tf.loadGraphModel("model/model.json")
  fileinput.addEventListener("change", e => {
    const [file] = fileinput.files
    if (file) {
      const url=URL.createObjectURL(file)
      preview.src = url;
      image.src = url;
    }
  })
  image.addEventListener("load", e => {
    const squares=tf.stack(
        extract(
          tf.image.resizeNearestNeighbor(
            tf.browser.fromPixels(image)
          ,[960,960])
        )
      ).toFloat();
    const prediction=model.predict(squares).argMax(1).arraySync();
    let pos={};
    for(let i in prediction){
      if(prediction[i]==0)continue;
      pos[String.fromCharCode(97+~~(i/8))+(7-i%8+1)]=pieceType[prediction[i]];
    }
    board.position(pos);
  })
})