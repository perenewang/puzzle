
from flask import Flask, request
from urllib.parse import unquote_plus
import json

app = Flask(__name__)

@app.route('/')
def index():
    return "<h1>Testing</h1>"

@app.route('/createPuzzle', methods = ['POST'])
def createPuzzle():
    imgSrc = "%s" % (request.json["img_src"])
    numPieces = request.json["num_pieces"]
    html = """
    <script src="https://flbulgarelli.github.io/headbreaker/js/headbreaker.js"></script>
    <body>
        <div id="puzzle"></div>
    </body>

    <script>
        let xNum = %s;

        let puzImg = new Image();
        puzImg.src = "%s";
        let currWidth = puzImg.naturalWidth;
        let currHeight = puzImg.naturalHeight;
        let ratio = Math.floor(currWidth / xNum);
        let yNum = Math.floor(currHeight / ratio);

        console.log(xNum);
        console.log(yNum);

        puzImg.onload = () => {
            const canvas = new headbreaker.Canvas('puzzle', {
                width: currWidth, height: currHeight,
                pieceSize: 50, proximity: 20,
                borderFill: 10, strokeWidth: 2,
                lineSoftness: 0.12, image: puzImg,
                outline: new headbreaker.outline.Rounded(),
                // optional, but it must be set in order to activate image scaling
                maxPiecesCount: {x:30, y:40}, 
                //puzzleDiameter: {x:200, y:500}

            });

            canvas.adjustImagesToPuzzleHeight();
            // canvas.adjustImagesToPuzzleWidth();
            canvas.autogenerate({
                verticalPiecesCount: yNum,
                horizontalPiecesCount: xNum,
            });
            canvas.draw();
            }
        </script>
        """ % (numPieces, imgSrc)
    file = open("../src/scripts/test.html", "w")
    file.write(html)
    return "completed"




if __name__ == "__main__":
    app.run(debug=True)