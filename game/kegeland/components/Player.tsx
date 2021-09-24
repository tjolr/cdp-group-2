import { World, Bodies } from 'matter-js';
import React from 'react';
import { View, Image } from 'react-native';
import { IEntity, IHitbox } from './components.types';
import PlaneImage from '../assets/plane_1_pink.png';

const Player = (props: IEntity) => {
  // Size of player calculated from the hitbox
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  // X and Y coordinate of center of player
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;
  return (
    <Image
      source={PlaneImage}
      style={{
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
        resizeMode: 'stretch',
      }}
    />
  );
};

export default ({ world, pos, size }: IHitbox) => {
  const player = Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Player',
  });
  player.collisionFilter = {
    group: -1,
    category: 1,
    mask: 1,
  };
  World.add(world, player);

  return {
    body: player,
    color: 'green',
    pos,
    renderer: <Player body={player} />,
  };
};
