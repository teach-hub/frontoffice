/**
 * @generated SignedSource<<748a0456416f3c3f51e23a6106238159>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type courseInfo$data = {
  readonly id: string;
  readonly subject: {
    readonly active: boolean | null;
    readonly code: string | null;
    readonly id: string | null;
    readonly name: string | null;
  };
  readonly " $fragmentType": "courseInfo";
};
export type courseInfo$key = {
  readonly " $data"?: courseInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"courseInfo">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "courseInfo",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "SubjectType",
      "kind": "LinkedField",
      "name": "subject",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "code",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "active",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CourseType",
  "abstractKey": null
};
})();

(node as any).hash = "049fcfce26bf878313ae293e6bdfb8b4";

export default node;
