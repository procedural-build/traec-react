import Im from "traec/immutable";
import { Component } from "react";

/**
 * Sorts a list of components by the spcified sortKey.
 *
 * @param {Component[]} components - Array of components
 * @param {String} sortKey - The key which the components should be sorted by.
 * @param {object} componentInfo - Contains the key/value-pairs that the componenets can be sorted by.
 *                                 Each componentInfo object is indexed by the corresponding compoenents propKey.
 *                                 componenetInfo = { propKey: { ComponentInfo Object} ... }
 * @param {String} propKey - The props key which the componentsInfo objects is indexed by.
 */
export const sortComponentList = function(components, sortKey, componentInfo, propKey) {
  if (components.size && sortKey) {
    componentInfo = Im.fromJS(componentInfo);

    let [...keys] = componentInfo.sortBy(component => component.get(sortKey)).keys();

    components = components.sortBy(component => {
      return keys.indexOf(component.props[propKey]);
    });
    return components;
  }

  return components;
};
