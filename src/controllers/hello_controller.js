import { Controller } from "stimulus"

export default class extends Controller {
//  connect() {
//    console.log("Hello, Stimulus! Hahaha", this.element)
// }
  greet() {
    console.log("Hello, Stimulus!", this.element)
  }
}
