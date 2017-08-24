import config from './config'
import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import GameScene from './scenes/GameScene'

const gameConfig = {
  type: Phaser.CANVAS,
  width: config.gameWidth,
  height: config.gameHeight,
  backgroundColor: config.backgroundColor,
  parent: 'gameContainer',
  scene: [BootScene, GameScene]
}

class Game extends Phaser.Game {
  constructor (gameConfig){
    super(gameConfig)
  }
}

window.game = new Game(gameConfig)
