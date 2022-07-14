import { Page } from "@playwright/test";

import { Atom } from "@n-able/atoms";
import { DevExtremeBase } from "./dev-extreme-base.po";
import { TreeViewAtom } from "../src/atoms/tree-view-atoms";


export class DevExtremeTreeView extends DevExtremeBase {
  private _treeView!: TreeViewAtom;
  private _treeViewUsingFindIn!: TreeViewAtom;

  get treeView(): TreeViewAtom {
    return Atom.initialise(
      this._treeView,
      () => new TreeViewAtom(this.demoOverlay.locator(`.${TreeViewAtom.CSS_CLASS}`))
    );
  }

  get treeViewUsingFindIn(): TreeViewAtom {
    return Atom.initialise(this._treeViewUsingFindIn, () =>
      Atom.findIn(TreeViewAtom, this.demoOverlay)
    );
  }

  constructor(page: Page) {
    super(page, "/Demos/WidgetsGallery/Demo/TreeView/HierarchicalDataStructure/AngularJS/Light/");
  }
}
