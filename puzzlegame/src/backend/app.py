
from flask import Flask, request
from urllib.parse import unquote_plus
import json
from PIL import Image

app = Flask(__name__)

@app.route('/')
def index():
    return "<h1>Testing</h1>"

@app.route('/createPuzzle', methods = ['POST'])
def createPuzzle():
    windowWidth = request.json["width"]
    windowHeight = request.json["height"]
    imgSrc = "%s" % (request.json["img_src"])
    xNum = request.json["num_pieces"]
    img = Image.open(request.json["img_src"])
    # get width and height
    width = img.width
    height = img.height
    ratio = width / xNum
    yNum = int(height // ratio)

    html = """
    <script src="https://flbulgarelli.github.io/headbreaker/js/headbreaker.js"></script>
    <style>
        div {
            border: solid red 3px;
        }
        #puzzle {
            align-items: center;
        }
    </style>
    <body id="puzzle">
    
    </body>

    <script>
        let xNum = %s;
        let yNum = %s;

        let puzImg = new Image();
        puzImg.src = "%s";

        console.log(xNum);
        console.log(yNum);

        puzImg.onload = () => {
            const canvas = new headbreaker.Canvas('puzzle', {
                width: %s, height: %s,
                pieceSize: 100, proximity: 20,
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
                horizontalPiecesCount: xNum,
                verticalPiecesCount: yNum,
            });
            canvas.draw();
            }
        </script>
        """ % (xNum, yNum, imgSrc, windowWidth, windowHeight)
    file = open("../scripts/test.html", "w")
    file.write(html)
    return "completed"




if __name__ == "__main__":
    app.run(debug=True)