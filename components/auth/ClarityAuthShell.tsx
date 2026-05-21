import Link from "next/link";

type Props = {
  title: string;
  lead: string;
  footer: React.ReactNode;
  children: React.ReactNode;
};

export function ClarityAuthShell({ title, lead, footer, children }: Props) {
  return (
    <div className="clarity-auth-wrap">
      <div className="clarity-auth-card">
        <h1>{title}</h1>
        <p className="clarity-auth-lead">{lead}</p>
        <div className="clarity-auth-clerk">{children}</div>
        <p className="clarity-auth-footer arc-mono">{footer}</p>
      </div>
    </div>
  );
}
