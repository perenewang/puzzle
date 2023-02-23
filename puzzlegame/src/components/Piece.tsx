import React, {Component} from 'react';
import * as SVG from "react-native-svg";


// Class to display a single puzzle piece
// Props include
//   visible : boolean      - Boolean controlling if the piece is on the board (True) or in the pieces bag (False)
//   z : number             - z-index of each piece
//   width : number         - Width of the completed puzzle
//   height : number        - Height of the completed puzzle
//   k : string             - key acting as identifier for the piece ("i-j")
//   p : string             - String defining path of SVG shape
//   top : number           - Top displacement
//   left : number          - Left displacement
//   img_src: string        - String defining path of image source
class Piece extends Component<{}, {visible: boolean, z : number, width : number, height : number, key : string, path : string, top : number, left : number, img_src : string}> {
    constructor(props : any){
        super(props);
        this.state= {
            visible: props.visible,
            z: props.z,
            width: props.width,
            height: props.height,
            key: props.k,
            path: props.p,
            top: props.top,
            left: props.left,
            img_src: props.img_src,
        };
        
        
    }

    componentDidMount() {
        console.log("Piece has mounted.")
    }

    componentWillUnmount() {
        console.log("Piece is unmounting.")
    }

    componentDidUpdate() {
        console.log("Piece has updated.")
        console.log(this.state.top, this.state.left);
    }

    getVis = () => {
        return this.state.visible;
    }
    
    getKey = () => {
        return this.state.key;
    }
    getLeft = () => {
        return this.state.left;
    }
    getTop = () => {
        return this.state.top;
    }

    updateCoords = (l : number, t : number) => {

        this.setState({
            left: l,
            top: t
        })
        

        return true;
    }
    
    updateVis(vis: boolean) {
        this.state = {
            visible: vis,
            z: this.state.z,
            width: this.state.width,
            height: this.state.height,
            key: this.state.key,
            path: this.state.path,
            top: this.state.top,
            left: this.state.left,
            img_src: this.state.img_src
        };
    }

    render(){
        return(
            <SVG.Svg
                width={this.state.width}
                height={this.state.height}
                fill="none"
                key={this.state.key}
                style={{ zIndex: this.state.z, overflow: "hidden", position: "absolute", top: this.state.top, left: this.state.left }}
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