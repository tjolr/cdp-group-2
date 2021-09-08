import React from 'react'
import { View } from 'react-native'
import Matter from 'matter-js'

interface PlayerInterface {
    world: any;
    pos: PositionInterface;
}

interface PositionInterface {
    x: number;
    y: number;
}

const Player = () => {
    return (
        <View style={{
            borderWidth: 1,
            borderColor: 'green',
            borderStyle: 'solid',
            position: 'absolute',
            left: 50,
            top: 250,
            width: 50,
            height: 50
        }}/>
    )
}

export default ({world, pos}: PlayerInterface) => {
    const player = Matter.Bodies.rectangle(
        pos.x,
        pos.y,
        50,
        50,
        {label: 'Player'}

    )
    Matter.World.add(world, player)

    return {
        body: player,
        color: 'green',
        pos,
        renderer: <Player/>
    }
}