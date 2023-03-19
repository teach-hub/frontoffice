/**
 * @generated SignedSource<<2932e666fe10398e28daf3a832368416>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NavigationCourseInfo$data = {
  readonly findCourse: {
    readonly id: string;
    readonly name: string;
  } | null;
  readonly " $fragmentType": "NavigationCourseInfo";
};
export type NavigationCourseInfo$key = {
  readonly " $data"?: NavigationCourseInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"NavigationCourseInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "courseId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NavigationCourseInfo",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "id",
          "variableName": "courseId"
        }
      ],
      "concreteType": "CourseType",
      "kind": "LinkedField",
      "name": "findCourse",
      "plural": false,
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
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ViewerType",
  "abstractKey": null
};

(node as any).hash = "362bccb89fba4a696d3908840a013cdf";

export default node;
