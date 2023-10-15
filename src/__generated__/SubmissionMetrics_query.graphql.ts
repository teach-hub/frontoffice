/**
 * @generated SignedSource<<e28e64ec92ae751e1232515607a20dad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionMetrics_query$data = {
  readonly metrics: {
    readonly contributions: ReadonlyArray<{
      readonly commitsMade: number;
      readonly id: string;
      readonly user: {
        readonly file: string;
        readonly id: string;
        readonly lastName: string;
        readonly name: string;
      };
    }>;
    readonly firstCommitDate: string | null;
    readonly lastCommitDate: string | null;
  } | null;
  readonly " $fragmentType": "SubmissionMetrics_query";
};
export type SubmissionMetrics_query$key = {
  readonly " $data"?: SubmissionMetrics_query$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionMetrics_query">;
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
  "name": "SubmissionMetrics_query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SubmissionMetricsType",
      "kind": "LinkedField",
      "name": "metrics",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "firstCommitDate",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "lastCommitDate",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "ContributionType",
          "kind": "LinkedField",
          "name": "contributions",
          "plural": true,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "UserType",
              "kind": "LinkedField",
              "name": "user",
              "plural": false,
              "selections": [
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
              "name": "commitsMade",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SubmissionType",
  "abstractKey": null
};
})();

(node as any).hash = "579ede9c1b00ceddfc5c8f68bd787215";

export default node;
