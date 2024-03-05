const navbarList = document.querySelector(".itens")

const navbarLines = document.querySelector(".nav-bar")

const body2 = document.querySelector("body")
const line1 = document.querySelector(".line1")
const line2 = document.querySelector(".line2")
const line3 = document.querySelector(".line3")



navbarLines.addEventListener("click", ()=>{
    
    if(navbarList.classList.contains("ativo")){
        navbarList.classList.remove("ativo")

        body2.style.overflowY = "auto"
        
        line1.style.display = "block"
        
        line2.style.transform = "rotate(0deg)"
        line2.style.position = "relative"
        
        line3.style.transform = "rotate(0deg)"

        navbarLines.style.marginTop = "20px"
    }else{
        navbarList.classList.add("ativo")
        
        body2.style.overflowY = "hidden"
        
        line1.style.display = "none"

        line2.style.transform = "rotate(-45deg)"
        line2.style.position = "absolute"
        
        line3.style.top = "1rem"
        line3.style.transform = "rotate(45deg)"

        navbarLines.style.marginTop = "30px"
    }

})