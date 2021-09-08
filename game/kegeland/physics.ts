import Matter from 'matter-js'

interface PhysicsInterface {
    entities: any,
    

}

interface InputInterface {
    touches: any,
    time: any
}

const Physics = (entities: PhysicsInterface, { touches, time }: InputInterface) => {
    let engine = entities.physics.engine

    touches.filter(t => t.type === 'press')
    .forEach(t => {
        Matter.Body.setVelocity(entities.Bird.body, {
            x: 0,
            y: -4
        })
    })

    Matter.Engine.update(engine, time.delta)

    return entities;
}
export default Physics;