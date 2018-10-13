import { createSelector } from "reselect";

export const openSelector = state => state.drawer.open;
export const closeSelector = createSelector(openSelector, isOpen => !isOpen);
export const titleSelector = () => "Test";
