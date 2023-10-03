/**
 * @generated SignedSource<<fa57f04213c41151208a79019bb4fe6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RepositoryStudentData = {
  groupId?: string | null;
  name: string;
  students?: ReadonlyArray<string> | null;
};
export type BaseRepositoryData = {
  includeAllBranches: boolean;
  name: string;
};
export type CreateRepositoryMutation$variables = {
  admins?: ReadonlyArray<string> | null;
  arePrivate: boolean;
  baseRepositoryData?: BaseRepositoryData | null;
  courseId: string;
  maintainers?: ReadonlyArray<string> | null;
  organization: string;
  repositoriesData?: ReadonlyArray<RepositoryStudentData> | null;
};
export type CreateRepositoryMutation$data = {
  readonly createRepositories: {
    readonly failedRepositoriesNames: ReadonlyArray<string> | null;
  } | null;
};
export type CreateRepositoryMutation = {
  response: CreateRepositoryMutation$data;
  variables: CreateRepositoryMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "admins"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "arePrivate"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "baseRepositoryData"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "courseId"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "maintainers"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "organization"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repositoriesData"
},
v7 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "admins",
        "variableName": "admins"
      },
      {
        "kind": "Variable",
        "name": "arePrivate",
        "variableName": "arePrivate"
      },
      {
        "kind": "Variable",
        "name": "baseRepositoryData",
        "variableName": "baseRepositoryData"
      },
      {
        "kind": "Variable",
        "name": "courseId",
        "variableName": "courseId"
      },
      {
        "kind": "Variable",
        "name": "maintainers",
        "variableName": "maintainers"
      },
      {
        "kind": "Variable",
        "name": "organization",
        "variableName": "organization"
      },
      {
        "kind": "Variable",
        "name": "repositoriesData",
        "variableName": "repositoriesData"
      }
    ],
    "concreteType": "CreateRepositoriesResponse",
    "kind": "LinkedField",
    "name": "createRepositories",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "failedRepositoriesNames",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateRepositoryMutation",
    "selections": (v7/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v5/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v4/*: any*/),
      (v6/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateRepositoryMutation",
    "selections": (v7/*: any*/)
  },
  "params": {
    "cacheID": "7dd541d0f6d6fb1f3ec41d4edf9e75eb",
    "id": null,
    "metadata": {},
    "name": "CreateRepositoryMutation",
    "operationKind": "mutation",
    "text": "mutation CreateRepositoryMutation(\n  $organization: String!\n  $courseId: ID!\n  $admins: [String!]\n  $maintainers: [String!]\n  $repositoriesData: [RepositoryStudentData!]\n  $arePrivate: Boolean!\n  $baseRepositoryData: BaseRepositoryData\n) {\n  createRepositories(organization: $organization, courseId: $courseId, admins: $admins, maintainers: $maintainers, repositoriesData: $repositoriesData, arePrivate: $arePrivate, baseRepositoryData: $baseRepositoryData) {\n    failedRepositoriesNames\n  }\n}\n"
  }
};
})();

(node as any).hash = "c25cb64f7371a28d7961756534053aa4";

export default node;
