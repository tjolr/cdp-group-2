import { getPipeSizePosBottom } from '../../../utils/random';

describe('Testing random utility functions', () => {
  it('Test the width of the obstacle', () => {
    const pipeSizePos = getPipeSizePosBottom();
    expect(pipeSizePos.pipe.size.width).toBe(75);
  });
  it('Test y-position of obstacle', () => {
    const pipeSizePos = getPipeSizePosBottom();
    expect(pipeSizePos.pipe.pos.y).toBeGreaterThan(399);
  });
});
