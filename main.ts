let marcoimg: Image = null
let fondoImg: Image = null
let ganado = 0
let girando = false
let r1 = 0
let r2 = 0
let r3 = 0
let premios: number[] = []
let simbolos: Image[] = []
let monedas = 0
let marco: Sprite = null
let carrete1: Sprite = null
let carrete2: Sprite = null
let carrete3: Sprite = null
let sprMonedas: Sprite = null
let sprMensaje: Sprite = null


monedas = 10
simbolos = [
    assets.image`cereza`,
    assets.image`limon`,
    assets.image`ojo`,
    assets.image`seta`,
    assets.image`naranja`
]
premios = [5, 4, 15, 8, 6]

function iniciar() {
    scene.setBackgroundColor(1)
    fondoImg = image.create(160, 120)
    fondoImg.fillRect(10, 30, 140, 70, 6)
    fondoImg.fillRect(12, 32, 136, 66, 11)
    fondoImg.fillRect(22, 42, 28, 28, 1)
    fondoImg.fillRect(66, 42, 28, 28, 1)
    fondoImg.fillRect(110, 42, 28, 28, 1)
    fondoImg.fillRect(0, 0, 160, 120, 12)
    fondoImg.fillRect(0, 0, 160, 29, 15)
    fondoImg.fillRect(19, 39, 34, 34, 14)
    fondoImg.fillRect(63, 39, 34, 34, 14)
    fondoImg.fillRect(107, 39, 34, 34, 14)
    fondoImg.fillRect(22, 42, 28, 28, 1)
    fondoImg.fillRect(66, 42, 28, 28, 1)
    fondoImg.fillRect(110, 42, 28, 28, 1)
    fondoImg.print("**Jackpot**", 20, 10, 2,image.font12)
    scene.setBackgroundImage(fondoImg)

    carrete1 = sprites.create(simbolos[0], SpriteKind.Player)
    carrete1.setFlag(SpriteFlag.Ghost, true)
    carrete1.x = 36
    carrete1.y = 56

    carrete2 = sprites.create(simbolos[0], SpriteKind.Player)
    carrete2.setFlag(SpriteFlag.Ghost, true)
    carrete2.x = 80
    carrete2.y = 56

    carrete3 = sprites.create(simbolos[0], SpriteKind.Player)
    carrete3.setFlag(SpriteFlag.Ghost, true)
    carrete3.x = 124
    carrete3.y = 56

    marcoimg = image.create(160, 120)
    marcoimg.fillRect(10, 30, 15, 70, 6)
    marcoimg.fillRect(50, 30, 18, 70, 6)
    marcoimg.fillRect(94, 30, 18, 70, 6)
    marcoimg.fillRect(135, 30, 15, 70, 6)
    marcoimg.fillRect(10, 30, 140, 12, 6)
    marcoimg.fillRect(10, 85, 140, 12, 6)
    marco = sprites.create(marcoimg, SpriteKind.Player)
    marco.setFlag(SpriteFlag.Ghost, true)
    marco.z = 10
    marco.x = 80
    marco.y = 60

    sprMonedas = sprites.create(image.create(100, 10), SpriteKind.Player)
    sprMonedas.setFlag(SpriteFlag.Ghost, true)
    sprMonedas.z = 20
    sprMonedas.x = 57
    sprMonedas.y =107

    sprMensaje = sprites.create(image.create(120, 10), SpriteKind.Player)
    sprMensaje.setFlag(SpriteFlag.Ghost, true)
    sprMensaje.z = 20
    sprMensaje.x = 67
    sprMensaje.y = 115

    actualizarMonedas()
    setMensaje("Click A to roll!")
}

function actualizarMonedas() {
    sprMonedas.image.fill(0)
    sprMonedas.image.print("Coins -> " + monedas, 2, 1, 5)
}

function setMensaje(texto: string) {
    sprMensaje.image.fill(0)
    sprMensaje.image.print(texto, 2, 1, 5)
}

function animarGiro() {
    for (let i = 0; i <= 19; i++) {
        r1 = Math.randomRange(0, 4)
        r2 = Math.randomRange(0, 4)
        r3 = Math.randomRange(0, 4)
        carrete1.setImage(simbolos[r1])
        carrete2.setImage(simbolos[r2])
        carrete3.setImage(simbolos[r3])
        pause(60 + i * 10)
    }
}

function comprobarPremio() {
    if (r1 == r2 && r2 == r3) {
        return premios[r1]
    }
    if (r1 == r2 || r2 == r3 || r3 == r1) {
        return 2
    }
    return 0
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (girando || monedas <= 0) return
    girando = true
    monedas -= 1
    actualizarMonedas()
    setMensaje("Rolling...")

    animarGiro()

    ganado = comprobarPremio()
    monedas += ganado
    actualizarMonedas()

    if (ganado > 0) {
        if (r1 == r2 && r2 == r3) {
            setMensaje("TRIO! +" + ganado + " coins!")
        } else {
            setMensaje("PAR! +" + ganado + " coins!")
        }
        music.playTone(784, music.beat(BeatFraction.Quarter))
        music.playTone(988, music.beat(BeatFraction.Quarter))
        music.playTone(1319, music.beat(BeatFraction.Half))
    } else {
        setMensaje("Bad luck...")
        music.playTone(200, music.beat(BeatFraction.Half))
    }

    pause(2000)

    if (monedas <= 0) {
        setMensaje("Game Over!")
        music.playTone(150, music.beat(BeatFraction.Whole))
        pause(2500)
        monedas = 10
        actualizarMonedas()
    }

    setMensaje("Click A to roll!")
    girando = false
})

iniciar()