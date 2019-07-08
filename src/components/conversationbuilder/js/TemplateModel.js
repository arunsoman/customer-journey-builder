import Welcome from "./Welcome"
import Options from "./Options"
import Stop from "./Stop"

import go from '../../../../node_modules/gojs/release/go-debug'
const $ = go.GraphObject.make;

class TemplateModel{
    #diagram
    #paletteElements = [];
    #divId
    constructor(d, id){
        
        this.diagram = d;
        this.divId = id;
        this.paletteElements = [];
        this.paletteElements.push(new Stop())
        this.paletteElements.push(new Options())
        this.paletteElements.push(new Welcome())
        this.paletteTemplate()
        this.CanvasTemplate()

    }
    paletteTemplate(){
        const myPalette = $(go.Palette, this.divId);
        const tt = myPalette.nodeTemplateMap;
        this.paletteElements.forEach(element => {
            myPalette.nodeTemplateMap.add(element.name, element.paletteTemplate);  
        });
        myPalette.model.nodeDataArray = this.paletteElements.map(e => {
            return e.dataModel
        })
    }

    CanvasTemplate(){
        this.paletteElements.forEach(element => {
        this.diagram.nodeTemplateMap.add(element.name, element.canvasTemplate)
        })
    }
}
export default TemplateModel
