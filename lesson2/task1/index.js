class ImageFilter {
  async grayscale(urlOrCanvas) {
    const normalized = await this._getNormalized(urlOrCanvas);
    const { canvas, context, imageData } = normalized;

    context.putImageData(this._grayscale(imageData), 0, 0);

    return canvas;
  }

  async invert(urlOrCanvas) {
    const normalized = await this._getNormalized(urlOrCanvas);
    const { canvas, context, imageData } = normalized;

    context.putImageData(this._invert(imageData), 0, 0);

    return canvas;
  }

  async _getImageByUrl(url) {
    const image = await this._fetchImage(url);

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;
    context.drawImage(image, 0, 0);

    const imageData = context.getImageData(0, 0, image.width, image.height);

    return {
      canvas,
      context,
      imageData,
    };
  }

  _getImageByCanvas(source) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.height = source.height;
    canvas.width = source.width;
    context.putImageData(
      source.getContext("2d").getImageData(0, 0, source.width, source.height),
      0,
      0
    );

    const imageData = context.getImageData(0, 0, source.width, source.height);

    return {
      canvas,
      context,
      imageData,
    };
  }

  async _getNormalized(urlOrCanvas) {
    if (typeof urlOrCanvas === "string") {
      return await this._getImageByUrl(urlOrCanvas);
    }

    return this._getImageByCanvas(urlOrCanvas);
  }

  _grayscale(imageData) {
    const { data } = imageData;

    for (let i = 0; i < data.length; i += 4) {
      const color = (data[i] + data[i + 1] + data[i + 2]) / 3;

      data[i] = color;
      data[i + 1] = color;
      data[i + 2] = color;
    }

    return imageData;
  }

  _invert(imageData) {
    const { data } = imageData;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];
    }

    return imageData;
  }

  _fetchImage(url) {
    return new Promise((resolve, reject) => {
      const image = new Image();

      image.src = url;

      image.setAttribute("crossOrigin", "Anonymous");
      image.onload = () => resolve(image);
      image.onerror = () => reject("Image loading error " + url);
    });
  }
}

const imageFilter = new ImageFilter();
imageFilter.invert("https://picsum.photos/id/237/200/300").then((canvas) => {
  var img = new Image();
  img.src = canvas.toDataURL();

  document.body.appendChild(img);
});
