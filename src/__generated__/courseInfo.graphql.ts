/**
 * @generated SignedSource<<f3d2c2d6eb2fbfaa99b1c46202c9f83a>>
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
    readonly name: string | null;
  };
  readonly " $fragmentType": "courseInfo";
};
export type courseInfo$key = {
  readonly " $data"?: courseInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"courseInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "courseInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SubjectType",
      "kind": "LinkedField",
      "name": "subject",
      "plural": false,
      "selections": [
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

(node as any).hash = "5e3fb7a16963dbc4bdd80ec618a262f0";

export default node;
