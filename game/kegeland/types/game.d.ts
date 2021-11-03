export interface GameData {
  points: number;
}

export interface PipeSizePos {
  pipe: {
    pos: {
      x: number;
      y: number;
    };
    size: {
      height: number;
      width: number;
    };
  };
}
