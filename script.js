const app = function() {

    class Game {
        
        init() {
            this.order = []
            this.clickedOrder = []
            this.score = 0
            this.elements = {
                0: document.querySelector('.green'),
                1: document.querySelector('.red'),
                2:  document.querySelector('.yellow'),
                3: document.querySelector('.blue')
            }
        }
        
        // Inicializa Tudo 
        run() {
            this.init()
            this.addColorEvents()
            this.playGame()
        }

        // Cria ordem aleatoria cada vez que troca de level
        shuffle() {
            this.order[this.order.length] = Math.floor(Math.random()* 4)
            this.clickedOrder = []

            this.lightColor()
        }

        // Ilumina a parte necessária baseada na ordem
        lightColor() {
            for(let i in this.order) {
                let element = this.elements[this.order[i]]
                let number = (Number(i) + 1) * 500

                setTimeout(() => {
                    element.classList.add('selected')
                }, number - 100)
                
                setTimeout(() => {
                    element.classList.remove('selected')
                }, number + 200)
            }
        }
        
        // Faz a checachem para ver se o player errou ou terminou o level
        checkOrder() {
            for(let i in this.clickedOrder) {
                if (this.clickedOrder[i] != this.order[i]) {
                    this.gameOver()
                    break
                }
            }

            this.nextLevel()
        }

        // Carrega o proximo level que é o level atual + uma random color
        // Além de aumentar a pontuação
        nextLevel() {
            if (this.clickedOrder.length == this.order.length) {
                if (this.order.length != 0) {
                    this.score++
                    alert(`Pontuação ${this.score}! Next...`)
                }
                this.shuffle()
            }
        }

        // Executa a todo click nas cores, Ilumina a cor, adiciona ela nas cores clicadas
        // e deselumina
        click(color) {
            this.clickedOrder[this.clickedOrder.length] = color
            this.elements[color].classList.add('selected')

            setTimeout(() => {
                this.elements[color].classList.remove('selected')
                this.checkOrder()
            }, 200)
        }

        // Reseta todas as variaveis e inicia um jogo novo
        gameOver() {
            alert(`Pontuação ${this.score}! Perdeu`)
            this.order = []
            this.clickedOrder = []
            this.score = 0;

            this.reset()
            //this.playGame()
        }
        
        // Avisa que o jogo ta começando e cria o level
        playGame() {
            this.nextLevel()
        }
        
        // Adiciona os eventos nas divs das cores
        addColorEvents() {
            for(let i in Object.values(this.elements)) {
                this.elements[i].onclick = () => this.click(i)
            }
        }

        reset() {

        }
    }
    
    let divGame = document.querySelector('.game')
    let divMenu = document.querySelector('.menu')
    let startButton = document.querySelector('#start-button')
    

    const genius = new Game()
    startButton.onclick = () => {
        divMenu.style.display = 'none'
        divGame.style.display = 'grid'
        genius.run()
    }

    let menu = () => {
        divGame.style.display = 'none'
        divMenu.style.display = 'block'
    }
    
    menu()
    genius.reset = () => {menu()}

}()