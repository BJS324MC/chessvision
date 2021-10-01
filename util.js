function extract(img){
  let samples=[],
  [width,height,channels]=img.shape
  width=~~(width/8)
  height=~~(height/8)
  for(let i=0;i<8;i++)
    for(let j=0;j<8;j++)
      samples.push(img.slice([j*height,i*width],[height,width]));
  return samples
}