const pizzaFilter = (pizzaType?: string) =>{
    if(!pizzaType){
      return ''
    } else {
      return ` and pt.description = '${pizzaType}'`
    }
  }

export default pizzaFilter