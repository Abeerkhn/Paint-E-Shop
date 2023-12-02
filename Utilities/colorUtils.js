import ExpressFormidable from "express-formidable";

export const findRelatedColors = (color) => {
    // Example: Generate related colors by shifting hue
    const shift = 20; // You can adjust the shift value based on your requirement
    const relatedColors = [
      shiftHue(color, shift),
      shiftHue(color, -shift),
    ];
  
    return relatedColors;
  };
  
  // Example function to shift hue of a color
  export const shiftHue = (color, degrees) => {
    // Convert hex to RGB
    const hex = color.replace(/^#/, '');
    const rgb = parseInt(hex, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >>  8) & 0xff;
    let b = (rgb >>  0) & 0xff;
  
    // Convert RGB to HSL
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
  
    // Shift hue
    h = (h + degrees / 360) % 1;
    if (h < 0) h += 1;
  
    // Convert HSL back to RGB
    let rNew, gNew, bNew;
    if (s === 0) {
      rNew = gNew = bNew = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      rNew = hue2rgb(p, q, h + 1/3);
      gNew = hue2rgb(p, q, h);
      bNew = hue2rgb(p, q, h - 1/3);
    }
  
    // Convert RGB to hex
    rNew = Math.round(rNew * 255);
    gNew = Math.round(gNew * 255);
    bNew = Math.round(bNew * 255);
    const hexNew = '#' + ((1 << 24) + (rNew << 16) + (gNew << 8) + bNew).toString(16).slice(1);
  
    return hexNew;
  };
  