import go from '../../../../node_modules/gojs/release/go-debug'
const $ = go.GraphObject.make;

import w from "./Welcome"
import Stop from './Stop';
import Options from './Options';

class CanvasDataModel{

    #diagram
    #selectedNode

    constructor(vueRef){
        const d = go.Diagram.fromDiv("goDiaDiv")
        this.diagram = d;
        const modelMaps = {};
        modelMaps.welcome = new w();
        modelMaps.stop = new Stop();
        modelMaps.options = new Options()

        d.addDiagramListener("ObjectSingleClicked",
            (e) => {
                var node = e.subject.part;
                if (!(node instanceof go.Node)) return;
                this.selectedElement = modelMaps[node.category]
                const data = this.selectedElement.extactData(node.part.data)
                this.selectedNode = node
                vueRef.populateData(data)
            });
    }

    updateModel(data){
        debugger
        var model = this.diagram.model
        model.startTransaction("Update props")
        for(var x in data){model.set(this.selectedNode.data, x, data[x])}
        model.commitTransaction("Update props")
       console.log("todo implement this") 
    }


    

}

export default CanvasDataModel