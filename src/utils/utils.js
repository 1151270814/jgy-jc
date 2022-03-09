export function debounce(func, wait, immediate) {
    let timeout
    
    return function(...args) {
      let context = this
      if (timeout) clearTimeout(timeout)
  
      if (immediate) {
        let callNow = !timeout
        timeout = setTimeout(function() {
          timeout = null
        }, wait)
        if (callNow) func.apply(context, args)
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args)
        }, wait)
      }
    }
  }
