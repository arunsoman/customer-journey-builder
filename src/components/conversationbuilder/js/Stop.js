import AbsractTemplate from "./AbstracrtTemplate"
import go from 'gojs/release/go-debug'
const $ = go.GraphObject.make;

class Stop extends AbsractTemplate {

  get paletteTemplate() {
    return $(go.Node, go.Panel.Spot,
      $(go.Shape, "Circle", this.baseProp('gray')),
      this.icon(""),
      this.label(this.name, "gray")
    )
  }
  get tooltipText() {
    return "What is Stop element"
  }
  get category() {
    return "Stop"
  }
  get name() {
    return "Stop"
  }
  get dataModel(){
    var e = this
    return {key: e.name, category: e.category, endText:""}
  }
  get canvasTemplate() {
    const toolTip= this.toolTip(this.tooltipText, "Gray")
    return $(go.Node, go.Panel.Spot,
      $(go.Shape, "Circle", this.baseProp('gray')),
      this.icon(""),
      this.label(this.name, "gray"),
      this.makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
      //     this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      //     this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
      // this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false), 
      {
        toolTip: toolTip
      }
    )
  }
}
export default Stop
