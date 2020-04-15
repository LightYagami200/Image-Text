// Dependencies
const express = require('express');
const Jimp = require('jimp');
const path = require('path');

// Init
const app = express();

app.get('/', async (req, res) => {
  if (!req.query.text) return res.status(400).json({ err: 'No text provided' });

  const bg = await Jimp.read('./img/bg.jpg');

  const font = await Jimp.loadFont('./fonts/aerokids.fnt');

  bg.print(
    font,
    0,
    0,
    {
      text: req.query.text,
      alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
      alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
    },
    1136,
    936,
    () => {
      bg.write(`image.jpg`, () => {
        return res.sendFile(path.join(__dirname, 'image.jpg'));
      });
    }
  );
});

app.listen(80);
