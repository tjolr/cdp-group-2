import { World, Bodies } from 'matter-js';
import React from 'react';
import { Image } from 'react-native';
import { IEntity, PlayerParams } from './components.types';
import PlaneImage from '../assets/plane_1_pink.png';
import FishImage from '../assets/fish.png';
import PlaneImageShield from '../assets/plane_1_pink_shield.png'
import PhysicsOne from '../physics/physicsOne';
import { useAppSelector } from '../state-management/redux.hooks';
import { controlsSel, pointsSel } from '../state-management/game/gameSlice';

const Player = (props: IEntity) => {
  // Size of player calculated from the hitbox
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const controls = useAppSelector(controlsSel);
  const points = useAppSelector(pointsSel);
  let image;
  if (controls == PhysicsOne) {
    image = FishImage;
  } else {
    image = PlaneImage;
  }
  if (points == 3) {
    image = PlaneImageShield
  }

  // X and Y coordinate of center of player
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;
  return (
    <Image
      source={image}
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

export default ({ world, pos, size, speed }: PlayerParams) => {
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
    pos,
    speed,
    renderer: <Player body={player} />,
  };
};
