import Navbar from "@/components/modules/shared/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar></Navbar>
      <main className="min-h-dvh mt-3">{children}</main>
    </>
  );
}
