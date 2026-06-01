function setRem() {
    const html = document.documentElement
  
    const width = html.clientWidth
  
    html.style.fontSize = `${width / 10}px`
  }
  
  setRem()
  
  window.addEventListener('resize', setRem)