import { World, Bodies } from 'matter-js';
import React from 'react';
import { View } from 'react-native';

interface IHitbox {
  world: any;
  pos: IPosition;
  size: ISize;
}

interface IPosition {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}

interface IPlayer {
  body: Matter.Body;
}

const Player = (props: IPlayer) => {
  // Size of player calculated from the hitbox
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  // X and Y coordinate of center of player
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: 'green',
        borderStyle: 'solid',
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default ({ world, pos, size }: IHitbox) => {
  const player = Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Player',
  });
  World.add(world, player);

  return {
    body: player,
    color: 'green',
    pos,
    renderer: <Player body={player} />,
  };
};
