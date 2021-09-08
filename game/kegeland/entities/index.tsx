import Matter from 'matter-js'
import Player from '../components/Player'

export default () => {
    let engine = Matter.Engine.create()
    let world = engine.world

    return {
        physics: { engine, world },
        Player: Player({world, pos: {x: 50, y: 250}})
    }

}