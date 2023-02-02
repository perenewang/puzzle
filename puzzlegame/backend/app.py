
from flask import Flask, request
from urllib.parse import unquote_plus
import json

app = Flask(__name__)

@app.route('/')
def index():
    return "<h1>Testing</h1>"

@app.route('/createPuzzle', methods = ['POST'])
def createPuzzle():
    imgSrc = request.json["img_src"]
    numPieces = request.json["num_pieces"]
    html = """
    <body>
        <div id="puzzle"></div>
    </body>

    <script>
        let puzImg = new Image();
        puzImg.src = \"%s\";
        puzImg.onload = () => {
            const canvas = new headbreaker.Canvas('puzzle', {
                width: 800, height: 800, pieceSize: 100, 
                outline: new headbreaker.outline.Rounded(), image: puzImg,
                preventOffstageDrag: true, fixed: true
            });
            canvas.autogenerate({
                horizontalPiecesCount: %s,
                verticalPiecesCount: %s,
            });
            canvas.shuffle(0.7);
            canvas.draw();
            }
        </script>
        """ % (imgSrc, numPieces, numPieces)
    file = open("../src/scripts/test.html", "w")
    file.write(html)
    return "completed"




if __name__ == "__main__":
    app.run(debug=True)