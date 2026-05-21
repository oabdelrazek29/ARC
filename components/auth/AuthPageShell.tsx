import Link from "next/link";

import { BrandLink } from "@/components/brand/BrandLink";

type AuthPageShellProps = {
  colophon: string;
  eyebrow: string;
  headline: React.ReactNode;
  lead: string;
  formLabel: string;
  formTitle: string;
  footer: React.ReactNode;
  children: React.ReactNode;
};

export function AuthPageShell({
  colophon,
  eyebrow,
  headline,
  lead,
  formLabel,
  formTitle,
  footer,
  children,
}: AuthPageShellProps) {
  return (
    <div className="arc-auth-page">
      <div className="arc-auth-page__grid">
        <div className="arc-auth-page__intro">
          <BrandLink className="arc-auth-page__brand" logoSize={36} />
          <p className="arc-colophon arc-auth-page__colophon">{colophon}</p>
          <p className="arc-mono arc-auth-page__eyebrow">{eyebrow}</p>
          <h1 className="arc-display arc-auth-page__headline">{headline}</h1>
          <p className="arc-lead arc-auth-page__lead">{lead}</p>
          <p className="arc-mono arc-auth-page__footer-link">{footer}</p>
        </div>

        <div className="arc-auth-page__form-wrap">
          <div className="arc-auth-card">
            <p className="arc-auth-card__label">{formLabel}</p>
            <h2 className="arc-heading arc-auth-card__title">{formTitle}</h2>
            <div className="arc-auth-card__clerk">{children}</div>
            <p className="arc-mono arc-auth-card__hint">
              Sessions persist · Your data stays on your account.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
