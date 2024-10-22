export const urlTabHandler = (currentTab: number) => {
  switch (currentTab) {
    case 0:
      return "newstories";
    case 1:
      return "topstories";
    case 2:
      return "beststories";
    default:
      return "newstories";
  }
};

export const urlTabHandlerName = (url: string) => {
  switch (url) {
    case "newstories":
      return 0;
    case "topstories":
      return 1;
    case "beststories":
      return 2;
    default:
      return 0;
  }
};
