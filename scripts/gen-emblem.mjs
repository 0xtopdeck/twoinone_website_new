// One-off: derive theme-legible emblem SVGs from the master vector.
// Dark theme brightens the deep brand teal so the mark reads on near-black;
// light theme keeps the original deep teal. Orange is constant.
import { readFileSync, writeFileSync } from "node:fs";

const SRC =
  "C:/Users/Al Muaddib/Desktop/Business/TwoInOne/tow_inone_logo/tow_in_one_vector_files_and_png_logo/TOW IN ONE vector LOGO.svg";
const PUB = "C:/Users/Al Muaddib/Desktop/Business/TwoInOne/twoinone_website_new-main/public/images/";
const APP = "C:/Users/Al Muaddib/Desktop/Business/TwoInOne/twoinone_website_new-main/app/";

let svg = readFileSync(SRC, "utf8");
svg = svg.slice(svg.indexOf("<svg")); // drop XML decl + comments
svg = svg.replace(/<text[\s\S]*?<\/text>/g, ""); // drop empty Inkscape text nodes
svg = svg.replace(/\swidth="[^"]*"/, "").replace(/\sheight="[^"]*"/, ""); // drop fixed mm size
svg = svg.replace("<svg", '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"');

const make = (teal, orange) =>
  svg.replace(/#033d61/gi, teal).replace(/#0b3f65/gi, teal).replace(/#f1701f/gi, orange);

writeFileSync(PUB + "twoinone-emblem-dark.svg", make("#2eb6d8", "#f1701f"));
writeFileSync(PUB + "twoinone-emblem-light.svg", make("#033d61", "#f1701f"));
writeFileSync(APP + "icon.svg", make("#033d61", "#f1701f"));
console.log("Emblem variants written: dark, light, favicon");
