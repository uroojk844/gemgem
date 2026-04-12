export interface IStone {
  category: string;
  description: string;
  id: string;
  stoneType: string[];
  isEditable: boolean;
}

export interface IFormStone {
  id: number;
  category: string;
  quantity: string;
  stoneType: string;
  caret: string;
  shape: "round" | "emerald";
}

const stoneAttributes: IStone[] = [
  {
    category: "diamond",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel velit nec sapien posuere viverra non eu est.",
    id: "item-001",
    stoneType: ["diamond"],
    isEditable: false,
  },
  {
    category: "gemstone",
    description:
      "If your item has one or multiple gemstones, specify the type of gemstone. This will help your buyers find your item faster.",
    id: "item-002",
    stoneType: ["ruby", "sapphire", "emerald", "moissanite", "quartz"],
    isEditable: true,
  },
];

export default stoneAttributes;
