import React, {Component} from 'react';
import * as SVG from "react-native-svg";


// Class to display a single puzzle piece
// Props include
//   visible : Bool (TODO)  - Boolean controlling if the piece is on the board (True) or in the pieces bag (False)
//   width : number         - Width of the completed puzzle
//   height : number        - Height of the completed puzzle
//   k : number             - Number key acting as identifier for the piece
//   p : string             - String defining path of SVG shape
//   top : number           - Top displacement
//   left : number          - Left displacement
//   img_src: string        - String defining path of image source
class Piece extends Component<{}, {width : number, height : number, key : number, path : string, top : number, left : number, img_src : string}> {
    constructor(props : any){
        super(props);
        this.state= {
            width: props.width,
            height: props.height,
            key: props.k,
            path: props.p,
            top: props.top,
            left: props.left,
            img_src: props.img_src
        };
    }

    updateCoords(left : number, top : number) {
        this.setState({
            left: left,
            top: top
        });
    }

    render(){
        return(
            <SVG.Svg
                width={this.state.width}
                height={this.state.height}
                fill="none"
                key={this.state.key}
                style={{ zIndex: -100, overflow: "hidden", top: this.state.top, left: this.state.left, position: "absolute" }}
            >
                <SVG.Defs>
                    <SVG.Pattern id="img1" width={this.state.width} height={this.state.height}>
                        <SVG.Image
                            width={this.state.width}
                            height={this.state.height}
                            x="0"
                            y="0"
                            preserveAspectRatio="xMidYMid slice"
                            href={this.state.img_src}
                        />
                    </SVG.Pattern>

                </SVG.Defs>
                <SVG.Path
                    d={this.state.path}
                    stroke="black"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="url(#img1)"
                />
            </SVG.Svg>
        );
    }
}

export default Piece;