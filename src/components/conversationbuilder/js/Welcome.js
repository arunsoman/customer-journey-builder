import AbsractTemplate from "./AbstracrtTemplate"
import go from '../../../../node_modules/gojs/release/go-debug'
const $ = go.GraphObject.make;

class Welcome extends AbsractTemplate {
  
  static mandatoryFields = ["category", "welcomeText"]

  get paletteTemplate() {
    const toolTip= this.toolTip(this.tooltipText, "Gray")
    return $(go.Node, go.Panel.Spot,
      $(go.Shape, "RoundedRectangle", this.baseProp('lightgreen')),
      this.icon(""),
      this.label(this.name, "gray"), { toolTip: toolTip }
    )
  }
  get dataModel(){
    var e = this
    return {name: e.name, category: e.category, welcomeText:""}
  }
  extactData(partData){
    const result = {}
     Object.assign(result, ... Welcome.mandatoryFields.map(e =>{return {  [e]: partData[e]} }))
     return result
  }

  static setData(partData){
    return Welcome.mandatoryFields.map(e =>{ return {key: e, value:partData[e] }})
 }

  get tooltipText() {
    return "What is welcome element"
  }
  get category() {
    return "welcome"
  }
  get name() {
    return "welcome"
  }
  get canvasTemplate() {
    const toolTip= this.toolTip(this.tooltipText, "Gray")
    return $(go.Node, go.Panel.Spot,
      $(go.Shape, "RoundedRectangle", this.baseProp('lightgreen')),
      this.icon(""),
      this.label(this.name, "gray"),
      // this.makePort("T", go.Spot.Top, go.Spot.TopSide, false, true),
      //     this.makePort("L", go.Spot.Left, go.Spot.LeftSide, true, true),
      //     this.makePort("R", go.Spot.Right, go.Spot.RightSide, true, true),
      this.makePort("B", go.Spot.Bottom, go.Spot.BottomSide, true, false), {
        toolTip: toolTip
      }
    )
  }
}
export default Welcome
