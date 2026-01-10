// Electronics
import Camera1 from "../../../../../assets/images/camera1.png";
import Camera2 from "../../../../../assets/images/camera2.png";
import Camera3 from "../../../../../assets/images/camera1.png";
import Drone1 from "../../../../../assets/images/drone1.png";
import Drone2 from "../../../../../assets/images/drone2.png";
import Drone3 from "../../../../../assets/images/drone1.png";
import Phone1 from "../../../../../assets/images/phone1.png";
import Phone2 from "../../../../../assets/images/phone2.png";
import Phone3 from "../../../../../assets/images/phone1.png";
import Laptop1 from "../../../../../assets/images/laptop1.png";
import Laptop2 from "../../../../../assets/images/camera2.png";
import Headphones1 from "../../../../../assets/images/headphones1.png";
import Headphones2 from "../../../../../assets/images/headphones1.png";

// Fashion
import Jacket1 from "../../../../../assets/images/jacket1.png";
import Jacket2 from "../../../../../assets/images/coat1.png";
import Dress1 from "../../../../../assets/images/dress1.png";
import Dress2 from "../../../../../assets/images/dress1.png";
import Shoes1 from "../../../../../assets/images/shoes1.png";
import Shoes2 from "../../../../../assets/images/shoes1.png";
import Bag1 from "../../../../../assets/images/bag1.png";
import Bag2 from "../../../../../assets/images/bag1.png";

// Home & Others
import Table1 from "../../../../../assets/images/table1.png";
import Table2 from "../../../../../assets/images/table1.png";
import Vase1 from "../../../../../assets/images/vase1.png";
import Vase2 from "../../../../../assets/images/vase1.png";
import Cookware1 from "../../../../../assets/images/cookware1.png";
import Cookware2 from "../../../../../assets/images/cookware1.png";
import Tools1 from "../../../../../assets/images/tools.png";
import Tools2 from "../../../../../assets/images/tools.png";
import Bundle1 from "../../../../../assets/images/bundle1.png";
import Bundle2 from "../../../../../assets/images/bundle1.png";

const PRODUCT_IMAGE_MAP = {
  "camera": [Camera1, Camera2, Camera3],
  "drone": [Drone1, Drone2, Drone3],
  "phone": [Phone1, Phone2, Phone3],
  "laptop": [Laptop1, Laptop2],
  "headphone": [Headphones1, Headphones2],

  "jacket": [Jacket1, Jacket2],
  "coat": [Jacket2],
  "dress": [Dress1, Dress2],
  "shoe": [Shoes1, Shoes2],
  "bag": [Bag1, Bag2],

  "table": [Table1, Table2],
  "vase": [Vase1, Vase2],
  "cookware": [Cookware1, Cookware2],
  "tool": [Tools1, Tools2],
  "bundle": [Bundle1, Bundle2],
};

export const resolveProductImages = (product) => {
  const key = (product.name || "").toLowerCase();

  for (const match in PRODUCT_IMAGE_MAP) {
    if (key.includes(match)) {
      return PRODUCT_IMAGE_MAP[match];
    }
  }

  // Default fallback
  return [Bundle1];
};
