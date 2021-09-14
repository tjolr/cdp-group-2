import { World, Bodies } from 'matter-js';
import React from 'react';
import { View } from 'react-native';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

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

interface IFloor {
  body: Matter.Body;
}

const Bounds = (props: IFloor) => {
  // Size of player calculated from the hitbox
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  // X and Y coordinate of center of player
  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  return (
    <View
      style={{
        backgroundColor: 'green',
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
  const floor = Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Floor',
    isStatic: true,
  });
  World.add(world, floor);

  return {
    body: floor,
    color: 'green',
    pos,
    renderer: <Bounds body={floor} />,
  };
};
