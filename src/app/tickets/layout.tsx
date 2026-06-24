import { getAuthOrRedirect } from "@/features/ticket/auth/queries/get-auth-or-redirect";

export default async function authenticatedTicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getAuthOrRedirect();
  return <>{children}</>;
}
