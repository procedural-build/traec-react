export const setNavBarItems = itemDict => {
  return {
    type: "ENTITY_SET_IN",
    payload: itemDict,
    stateParams: {
      itemPath: "ui.navbar.items"
    }
  };
};
