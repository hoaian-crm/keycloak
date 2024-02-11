export class CreatePolicy {
  type: 'role';
  logic: 'POSITIVE' | "NAGATIVE";
  decisionStrategy: "UNANIMOUS";
  name: string;
  roles: Array<
    { id: string } // Role id to attach this policy
  >;
  description: string;
}
