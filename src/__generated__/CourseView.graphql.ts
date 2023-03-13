/**
 * @generated SignedSource<<6cb9e43b349b7ac2f10f5bc60dcd2c23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CourseView$data = {
  readonly name: string;
  readonly period: number;
  readonly role: {
    readonly name: string | null;
    readonly parent: {
      readonly id: number | null;
      readonly name: string | null;
    } | null;
    readonly permissions: ReadonlyArray<string | null> | null;
  };
  readonly subject: {
    readonly active: boolean | null;
    readonly code: string;
    readonly id: string | null;
    readonly name: string;
  };
  readonly users: ReadonlyArray<{
    readonly file: string | null;
    readonly lastName: string | null;
    readonly name: string | null;
  } | null>;
  readonly year: number;
  readonly " $fragmentType": "CourseView";
};
export type CourseView$key = {
  readonly " $data"?: CourseView$data;
  readonly " $fragmentSpreads": FragmentRefs<"CourseView">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
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
  "name": "CourseView",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserType",
      "kind": "LinkedField",
      "name": "users",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "file",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "year",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "period",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "ViewerRoleType",
      "kind": "LinkedField",
      "name": "role",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "ViewerRoleType",
          "kind": "LinkedField",
          "name": "parent",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v0/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "permissions",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Subject",
      "kind": "LinkedField",
      "name": "subject",
      "plural": false,
      "selections": [
        (v1/*: any*/),
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
        (v0/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "ViewerCourseType",
  "abstractKey": null
};
})();

(node as any).hash = "6c31a4d75e19ba93f5cde8fe6674d410";

export default node;
