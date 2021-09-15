interface IPosition {
  x: number;
  y: number;
}

interface ISize {
  width: number;
  height: number;
}

export interface IEntity {
  body: Matter.Body;
}

export interface IHitbox {
  world: any;
  pos: IPosition;
  size: ISize;
}
