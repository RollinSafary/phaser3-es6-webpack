import Phaser from 'phaser'
import SceneKey from '../constants/SceneKey'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super(SceneKey.SCENE_BOOT)
  }

  preload () {
    this.load.image('mushroom', 'assets/mushroom.png')
  }

  create () {
    this.scene.start(SceneKey.SCENE_GAME)
  }
}
