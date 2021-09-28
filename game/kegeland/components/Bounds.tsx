import { World, Bodies } from 'matter-js';
import React from 'react';
import { IHitbox } from './components.types';

const Bounds = () => {
  return <></>;
};

export default ({ world, pos, size }: IHitbox) => {
  const bounds = Bodies.rectangle(pos.x, pos.y, size.width, size.height, {
    label: 'Bounds',
    isStatic: true,
  });
  bounds.collisionFilter = {
    category: 1,
    mask: 1,
  };
  World.add(world, bounds);

  return {
    body: bounds,
    pos,
    renderer: <Bounds />,
  };
};
