

const set = new Set();

exports.addkeyinCache = ( value) => {

      set.add(value)
      console.log(set)
}


exports.keyexists = (value) =>{

    return set.has(value)
}













