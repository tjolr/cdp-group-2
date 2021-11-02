import { World, Bodies } from 'matter-js';
import React from 'react';
import { View } from 'react-native';
import { IEntity, ObstacleParams, PlayerParams } from './components.types';

const Obstacle = (props: IEntity) => {
  // Size of obstacle calculated from the hitbox
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  // X and Y coordinate of center of obstacle
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={{
        backgroundColor: '#ffd500',
        borderStyle: 'solid',
        borderColor: '#ffb700',
        borderWidth: 3,
        borderRadius: 10,
        position: 'absolute',
        left: xBody,
        top: yBody,
        width: widthBody,
        height: heightBody,
      }}
    />
  );
};

export default ({ world, pos, size, userGameSettings }: ObstacleParams) => {
  const obstacle = Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Obstacle',
    isStatic: true,
  });
  obstacle.collisionFilter = {
    group: -1,
  };
  World.add(world, obstacle);

  return {
    body: obstacle,
    pos,
    userGameSettings,
    renderer: <Obstacle body={obstacle} />,
  };
};
