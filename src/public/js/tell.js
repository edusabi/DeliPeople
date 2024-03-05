const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }

  const pre_Carregamento = document.querySelector(".pre-carregamento")
  const body = document.querySelector("body")

  function preCarregamento(){
    
    body.style.overflowY = "hidden"
    
    setTimeout(()=>{
      
      pre_Carregamento.style.opacity = "0"
      pre_Carregamento.style.display = "none"
      
      body.style.overflowY = "auto"

    }, 5500)
  }

