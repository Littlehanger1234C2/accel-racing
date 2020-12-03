scene.onOverlapTile(SpriteKind.Player, myTiles.tile2, function (sprite, location) {
    music.playTone(277, music.beat(BeatFraction.Eighth))
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorLight0, function (sprite, location) {
    checkPoint = 1
})
function initTimeView () {
    scene.createRenderable(0, function (target: Image, camera: scene.Camera) {
    const s = "Time " + formatTime(lapTime)+"  Best "+formatTime(bestTime)
    const font = image.font8
    const width = font.charWidth * s.length;
    const left = (screen.width >> 1) - (width >> 1) + 1;
    screen.fillRect(left, 0, width, font.charHeight, 0);
    screen.print(s, left, 0, 3, font);
})
function formatTime(t:number) {
    if (t==0) {
        return "--.--"
    }
    const seconds = Math.idiv(t, 1000)
    const remainder = Math.idiv(t % 1000, 10)
    return formatDecimal(seconds) + "." + formatDecimal(remainder)
}
function formatDecimal(val: number) {
    val |= 0;
    if (val < 10) {
        return "0" + val;
    }
    return val.toString();
}
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.playTone(523, music.beat(BeatFraction.Eighth))
    direction += 1
    direction = direction % 4
    setSpriteDirection()
})
function setSpriteDirection () {
    mySprite.setImage(cars[direction])
    mySprite.ax = accel * dx[direction]
    mySprite.ay = accel * dy[direction]
}
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.floorMixed, function (sprite, location) {
    if (checkPoint == 1) {
        checkPoint = 0
        startTime = game.runtime()
        if (bestTime == 0 || lapTime < bestTime) {
            bestTime = lapTime
            music.powerUp.play()
        }
    }
})
let startTime = 0
let checkPoint = 0
let cars: Image[] = []
let dy: number[] = []
let dx: number[] = []
let direction = 0
let accel = 0
let mySprite: Sprite = null
scene.setBackgroundColor(13)
mySprite = sprites.create(sprites.vehicle.carRedLeft, SpriteKind.Player)
mySprite.setPosition(192, 48)
scene.cameraFollowSprite(mySprite)
tiles.setTilemap(tiles.createTilemap(hex`1b001800010101010101010101010101010101010101010101010101010101010606060606060606060607050505050505050505050505050501010606060606060606060607050505050505050505050505050501010606080808080808080807080808080808080808050501050501010606080606060606060607050505050505050508050501050501010606080606060606060607050505050505050508050501050501010606080606010101010101010101010101050508050501050501010606080606010202020202020202020201050508050501050501010606080606010202000202020200020201050508050501050501010606080606010202000202020200020201050508050501050501010606080606010202000202020200020201050508050501050501010606080606010202000202020200020201040408040401040401010404080404010202020202020202020201060608060601060601010505080505010202000202020200020201060608060601060601010505080505010202020000000002020201060608060606060601010505080505010202020202020202020202060608060606060601010505080505050505050505050306060606060608060606060601010505080505010101010101010101010101060608060601010101010505080505050505050505050306060606060608060601010101010505080505050505050505050306060606060608060601010101010505080808080808080808080808080808080808060601010101010505050505050505050505050306060606060606060601010101010505050505050505050505050306060606060606060601010101010101010101010101010101010101010101010101010101010101`, img`
    222222222222222222222222222
    2.........................2
    2.........................2
    2..22222222.222222222..2..2
    2..2................2..2..2
    2..2................2..2..2
    2..2..222222222222..2..2..2
    2..2..222222222222..2..2..2
    2..2..222222222222..2..2..2
    2..2..222222222222..2..2..2
    2..2..222222222222..2..2..2
    2..2..222222222222.....2..2
    2.....222222222222..2..2..2
    2..2..222222222222..2..2..2
    2..2..222222222222..2.....2
    2..2..222222222222..2.....2
    2..2................2.....2
    2..2..222222222222..2..2222
    2..2................2..2222
    2..2................2..2222
    2..2222222222.2222222..2222
    2......................2222
    2......................2222
    222222222222222222222222222
    `, [myTiles.tile0,sprites.builtin.forestTiles0,sprites.castle.tileGrass1,sprites.dungeon.floorLight0,sprites.dungeon.floorDark0,sprites.dungeon.floorDark2,sprites.dungeon.floorLight2,sprites.dungeon.floorMixed,myTiles.tile2], TileScale.Sixteen))
accel = 220
direction = 0
dx = [-1, 0, 1, 0]
dy = [0, 1, 0, -1]
cars = [sprites.vehicle.carRedLeft, sprites.vehicle.carRedFront, sprites.vehicle.carRedRight, sprites.vehicle.carRedBack]
setSpriteDirection()
let bestTime = 0
let lapTime = 0
initTimeView()
checkPoint = 0
game.showLongText("Turn your car by \"A\" butt.", DialogLayout.Bottom)
startTime = game.runtime()
game.onUpdate(function () {
    mySprite.vx = mySprite.vx * 0.97
    mySprite.vy = mySprite.vy * 0.97
    lapTime = game.runtime() - startTime
})
