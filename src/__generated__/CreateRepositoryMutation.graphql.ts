/**
 * @generated SignedSource<<05ecc0ad2c1e6ee0ccd3a46ce383a81f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RepositoryStudentData = {
  name: string;
  students?: ReadonlyArray<string> | null;
};
export type CreateRepositoryMutation$variables = {
  admins?: ReadonlyArray<string> | null;
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
  "name": "courseId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "maintainers"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "organization"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "repositoriesData"
},
v5 = [
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
      (v4/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateRepositoryMutation",
    "selections": (v5/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreateRepositoryMutation",
    "selections": (v5/*: any*/)
  },
  "params": {
    "cacheID": "e922ba9e87b0c09cdd1fec1d459d86ee",
    "id": null,
    "metadata": {},
    "name": "CreateRepositoryMutation",
    "operationKind": "mutation",
    "text": "mutation CreateRepositoryMutation(\n  $organization: String!\n  $courseId: ID!\n  $admins: [String!]\n  $maintainers: [String!]\n  $repositoriesData: [RepositoryStudentData!]\n) {\n  createRepositories(organization: $organization, courseId: $courseId, admins: $admins, maintainers: $maintainers, repositoriesData: $repositoriesData) {\n    failedRepositoriesNames\n  }\n}\n"
  }
};
})();

(node as any).hash = "155700d7b602245fadc301587f005ef4";

export default node;
