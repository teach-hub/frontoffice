/**
 * @generated SignedSource<<6bb28dc2fc9ff805735e6a44999f1abb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type reviewersPreview$data = {
  readonly previewReviewers: ReadonlyArray<{
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
      "alias": null,
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

(node as any).hash = "3f44882a0abaa2ca52ee91274e0f09b3";

export default node;
