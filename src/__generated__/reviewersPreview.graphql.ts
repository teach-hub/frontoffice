/**
 * @generated SignedSource<<21852e6d69db990f75e3ecce72893cda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewersPreview$data = {
  readonly previewData: ReadonlyArray<{
    readonly id: string;
    readonly reviewee: {
      readonly id: string;
      readonly lastName: string;
      readonly name: string;
    };
    readonly reviewer: {
      readonly id: string;
      readonly lastName: string;
      readonly name: string;
    };
  }>;
  readonly " $fragmentType": "reviewersPreview";
};
export type reviewersPreview$key = {
  readonly " $data"?: reviewersPreview$data;
  readonly " $fragmentSpreads": FragmentRefs<"reviewersPreview">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastName",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "reviewersPreview",
  "selections": [
    {
      "alias": "previewData",
      "args": null,
      "concreteType": "ReviewerPreviewType",
      "kind": "LinkedField",
      "name": "previewReviewers",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "UserType",
          "kind": "LinkedField",
          "name": "reviewee",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserType",
          "kind": "LinkedField",
          "name": "reviewer",
          "plural": false,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AssignmentType",
  "abstractKey": null
};
})();

(node as any).hash = "6ba770fbdcba5eeb5d1484ae1cd5e11f";

export default node;
