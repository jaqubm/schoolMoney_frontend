export type ClassData = () => {
  classId: string;
  name: string;
  schoolName: string;
  isTreasurer: boolean;
  treasurer: {
    email: string;
    name: string;
    surname: string;
  };
};
